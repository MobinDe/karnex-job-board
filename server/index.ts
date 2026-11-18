import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

// ==================== تنظیمات اولیه ====================
const app = express();

const JWT_SECRET = process.env.JWT_SECRET || "karnex-super-secret-key";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("❌ متغیر DATABASE_URL تعریف نشده است.");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// ==================== اینترفیس‌های اختصاصی ====================
// گسترش اینترفیس Request برای اضافه کردن اطلاعات کاربر پس از لاگین
interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}

// ==================== میدل‌ورها ====================
// میدل‌ور برای بررسی توکن JWT در مسیرهای محافظت شده
const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "لطفاً ابتدا وارد حساب کاربری خود شوید." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      role: string;
    };
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "توکن نامعتبر یا منقضی شده است." });
  }
};

// ==================== توابع کمکی ====================
// انتقال منطق پیچیده فیلترها به یک تابع جداگانه (تمیزتر و بدون خطای CodeScene)
const buildJobWhereClause = (query: Request["query"]): Prisma.JobWhereInput => {
  const { q, jobType, experienceLevel, location, salaryRange, datePosted } =
    query;
  const andConditions: Prisma.JobWhereInput[] = [];

  // ۱. جستجو
  if (q && typeof q === "string" && q.trim() !== "") {
    andConditions.push({
      OR: [
        { title: { contains: q.trim(), mode: "insensitive" } },
        { companyName: { contains: q.trim(), mode: "insensitive" } },
        { location: { contains: q.trim(), mode: "insensitive" } },
      ],
    });
  }

  // ۲. نوع همکاری
  if (jobType && typeof jobType === "string" && jobType.trim() !== "") {
    const types = jobType.split(",").filter(Boolean);
    if (types.length > 0) andConditions.push({ jobType: { in: types } });
  }

  // ۳. سطح ارشدیت
  if (
    experienceLevel &&
    typeof experienceLevel === "string" &&
    experienceLevel.trim() !== ""
  ) {
    const levels = experienceLevel.split(",");
    const expKeywords: Record<string, string[]> = {
      intern: ["کارآموز", "intern"],
      junior: ["جونیور", "junior"],
      mid: ["مید", "mid"],
      senior: ["سنیور", "senior", "ارشد"],
      lead: ["لید", "lead", "مدیر", "manager"],
    };
    const titleSearches = levels.flatMap((level) =>
      (expKeywords[level] || []).map((kw) => ({
        title: { contains: kw, mode: "insensitive" as Prisma.QueryMode },
      })),
    );
    if (titleSearches.length > 0) andConditions.push({ OR: titleSearches });
  }

  // ۴. موقعیت مکانی
  if (location && typeof location === "string" && location.trim() !== "") {
    andConditions.push({
      location: { contains: location.trim(), mode: "insensitive" },
    });
  }

  // ۵. محدوده حقوق
  if (salaryRange && typeof salaryRange === "string") {
    const salaryKeywords: Record<string, string[]> = {
      "0-10": ["۵", "۸", "۱۰"],
      "10-20": ["۱۰", "۱۵", "۲۰"],
      "20-30": ["۲۰", "۲۵", "۳۰"],
      "30-50": ["۳۰", "۳۵", "۴۰", "۴۵", "۵۰"],
      "50+": ["۵۰", "۶۰", "۷۰", "۸۰"],
    };
    const keywords = salaryKeywords[salaryRange];
    if (keywords)
      andConditions.push({
        OR: keywords.map((kw) => ({ salary: { contains: kw } })),
      });
  }

  // ۶. زمان انتشار
  if (datePosted && typeof datePosted === "string" && datePosted !== "all") {
    const now = new Date();
    const gteDate = new Date();
    if (datePosted === "24h") gteDate.setDate(now.getDate() - 1);
    else if (datePosted === "7d") gteDate.setDate(now.getDate() - 7);
    else if (datePosted === "30d") gteDate.setDate(now.getDate() - 30);
    andConditions.push({ createdAt: { gte: gteDate } });
  }

  return andConditions.length > 0 ? { AND: andConditions } : {};
};

// ==================== مسیرهای احراز هویت ====================

app.post("/api/auth/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "این ایمیل قبلاً ثبت شده است." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(201)
      .json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطا در ثبت‌نام" });
  }
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "ایمیل یا رمز عبور اشتباه است." });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: "ایمیل یا رمز عبور اشتباه است." });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطا در ورود" });
  }
});

// ==================== مسیرهای آگهی‌ها ====================

app.get("/api/jobs", async (req: Request, res: Response) => {
  try {
    const { page = "1", limit = "10" } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    const where = buildJobWhereClause(req.query);
    const orderBy: Prisma.JobOrderByWithRelationInput = { createdAt: "desc" };

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({ where, orderBy, skip, take: limitNum }),
      prisma.job.count({ where }),
    ]);

    res.json({
      jobs,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطایی در دریافت اطلاعات رخ داد." });
  }
});

// ==================== مسیرهای درخواست شغلی (Apply) ====================

// ۱. ارسال رزومه برای یک آگهی (نیاز به لاگین دارد)
app.post(
  "/api/jobs/:id/apply",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const jobId = parseInt(req.params.id as string, 10);
      const userId = req.user!.userId; // با استفاده از authenticateToken مطمئنیم که وجود دارد

      // بررسی اینکه آیا آگهی وجود دارد
      const job = await prisma.job.findUnique({ where: { id: jobId } });
      if (!job) {
        return res.status(404).json({ error: "آگهی مورد نظر یافت نشد." });
      }

      // بررسی اینکه کاربر قبلاً رزومه ارسال نکرده باشد
      const existingApp = await prisma.application.findFirst({
        where: { userId, jobId },
      });

      if (existingApp) {
        return res
          .status(400)
          .json({ error: "شما قبلاً برای این آگهی رزومه ارسال کرده‌اید." });
      }

      const application = await prisma.application.create({
        data: {
          userId,
          jobId,
          status: "pending",
        },
      });

      res
        .status(201)
        .json({ message: "رزومه با موفقیت ارسال شد!", application });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "خطا در ارسال رزومه" });
    }
  },
);

// ۲. دریافت لیست درخواست‌های کاربر جاری (نیاز به لاگین دارد)
app.get(
  "/api/applications",
  authenticateToken,
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;

      const applications = await prisma.application.findMany({
        where: { userId },
        include: {
          job: {
            select: {
              id: true,
              title: true,
              companyName: true,
              location: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      res.json(applications);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "خطا در دریافت اطلاعات" });
    }
  },
);

// ==================== اجرای سرور ====================
export default app;