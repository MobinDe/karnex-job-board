import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

// ==================== تنظیمات اتصال ====================
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('❌ متغیر DATABASE_URL در فایل .env تعریف نشده است.');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ==================== قالب‌های شغلی ====================
interface JobTemplate {
  title: string;
  salary: string;
  description: string;
  requirements: string;
  benefits: string;
}

const jobTemplates: JobTemplate[] = [
  {
    title: 'توسعه‌دهنده ارشد فرانت‌اند (React)',
    salary: '۳۰ تا ۴۰ میلیون',
    description: 'ما به دنبال یک توسعه‌دهنده فرانت‌اند با تجربه و خلاق هستیم تا به تیم فنی ما بپیوندد. شما در این نقش مسئولیت طراحی و پیاده‌سازی رابط‌های کاربری پیچیده و جذاب را بر عهده خواهید داشت.',
    requirements: 'حداقل ۳ سال سابقه کار با React\nتسلط کامل به TypeScript\nآشنایی با Next.js و Tailwind CSS\nتوانایی مدیریت State (مانند Zustand یا Redux)',
    benefits: 'بیمه تکمیلی\nامکان دورکاری\nغذای رایگان\nپاداش عملکرد',
  },
  {
    title: 'برنامه‌نویس بک‌اند (Node.js)',
    salary: '۲۵ تا ۳۵ میلیون',
    description: 'تیم بک‌اند ما به دنبال یک برنامه‌نویس متخصص Node.js است تا زیرساخت‌های سمت سرور محصولات ما را توسعه دهد. شما با دیتابیس‌های حجیم و معماری میکروسرویس کار خواهید کرد.',
    requirements: 'تسلط به Node.js و Express\nآشنایی با دیتابیس PostgreSQL\nتجربه کار با Prisma یا TypeORM\nآشنایی با Docker و CI/CD',
    benefits: 'بیمه تکمیلی\nساعت کاری منعطف\nتوسعه مهارت‌ها\nتفریحات تیمی',
  },
  {
    title: 'طراح UI/UX',
    salary: '۲۰ تا ۳۰ میلیون',
    description: 'ما به دنبال یک طراح خلاق و بااستعداد هستیم که بتواند تجربه کاربری بی‌نظیری برای میلیون‌ها کاربر ما خلق کند. شما مسئول طراحی رابط کاربری اپلیکیشن و وب‌سایت ما خواهید بود.',
    requirements: 'تسلط به Figma\nآشنایی با اصول طراحی تجربه کاربری\nتوانایی ساخت پروتوتایپ\nدرک عمیق از Design System',
    benefits: 'محیط خلاقانه\nبیمه تکمیلی\nدوره‌های آموزشی\nامکان ارتقاء',
  },
  {
    title: 'کارشناس دیجیتال مارکتینگ',
    salary: '۱۵ تا ۲۰ میلیون',
    description: 'برای توسعه کمپین‌های بازاریابی دیجیتال و افزایش آگاهی از برند، به یک کارشناس مارکتینگ با انگیزه نیاز داریم. شما با تیم محتوا و طراحی همکاری نزدیک خواهید داشت.',
    requirements: 'آشنایی با ابزارهای تحلیل (Google Analytics)\nتجربه در کمپین‌های تبلیغاتی\nتسلط به سئو و SEM\nتوانایی تولید محتوا',
    benefits: 'پاداش عملکرد\nبیمه تکمیلی\nتفریحات تیمی\nمحیط پویا',
  },
  {
    title: 'کارآموز برنامه‌نویسی',
    salary: '۵ تا ۱۰ میلیون',
    description: 'فرصتی عالی برای شروع مسیر حرفه‌ای در دنیای برنامه‌نویسی! ما به دنبال افراد باانگیزه و علاقه‌مند به یادگیری هستیم. شما در کنار تیم فنی ما تجربه عملی کسب خواهید کرد.',
    requirements: 'آشنایی مقدماتی با یک زبان برنامه‌نویسی\nعلاقه به یادگیری\nتوانایی کار تیمی\nمسئولیت‌پذیری',
    benefits: 'محیط آموزشی\nمنتورینگ\nامکان جذب پس از دوره\nمحیط صمیمی',
  },
  {
    title: 'مهندس دواپس (DevOps)',
    salary: '۴۰ تا ۵۰ میلیون',
    description: 'ما به دنبال یک مهندس دواپس برای مدیریت زیرساخت‌های ابری و خودکارسازی فرآیندهای استقرار (CI/CD) هستیم. اگر به اتوماسیون و پایداری سیستم‌ها علاقه دارید، این جایگاه برای شماست.',
    requirements: 'تسلط به Docker و Kubernetes\nتجربه با AWS یا GCP\nآشنایی با Linux و شبکه\nمهارت در نوشتن اسکریپت‌های Bash یا Python',
    benefits: 'بیمه تکمیلی\nپاداش عملکرد\nامکان دورکاری\nتجهیزات کاری',
  },
  {
    title: 'مدیر محصول (Product Manager)',
    salary: '۳۵ تا ۴۵ میلیون',
    description: 'ما به دنبال یک مدیر محصول با تجربه هستیم که بتواند استراتژی محصول را تعیین کند و تیم‌های فنی و طراحی را هدایت کند. شما پل ارتباطی بین نیازهای کاربران و تیم فنی خواهید بود.',
    requirements: 'تجربه در مدیریت محصولات دیجیتال\nتوانایی تحلیل داده\nمهارت‌های ارتباطی قوی\nآشنایی با Agile و Scrum',
    benefits: 'بیمه تکمیلی\nپاداش عملکرد\nامکان ارتقاء\nساعت کاری منعطف',
  },
  {
    title: 'کارشناس تست و تضمین کیفیت (QA)',
    salary: '۱۸ تا ۲۵ میلیون',
    description: 'برای اطمینان از کیفیت محصولات نرم‌افزاری، به یک کارشناس تست با دقت و منظم نیاز داریم. شما مسئول شناسایی باگ‌ها و بهبود فرآیندهای تست خواهید بود.',
    requirements: 'آشنایی با تست‌های Manual و Automated\nتسلط به ابزارهایی مثل Selenium یا Cypress\nآشنایی با Jira و Agile\nدقت بالا و تفکر تحلیلی',
    benefits: 'بیمه تکمیلی\nتوسعه مهارت‌ها\nغذای رایگان\nمحیط صمیمی',
  }
];

const companyNames = [
  'دیجی‌کالا', 'اسنپ', 'تپسی', 'کافه‌بازار', 'علی‌بابا', 'دیوار', 
  'فیلیمو', 'اسنپ‌فود', 'بازار', 'مبین‌نت', 'همراه اول', 'ایرانسل',
  'گروه صنعتی گلرنگ', 'فناپ', 'داتین', 'بهسازان ملت', 'پارس‌پک', 'آپ',
  'اسنپ‌مارکت', 'بیمه باما'
];

const locations = [
  'تهران', 'اصفهان', 'مشهد', 'شیراز', 'تبریز', 'کرج', 'دورکاری (کل ایران)'
];

const jobTypes = ['full-time', 'part-time', 'remote', 'contract'];

// ==================== توابع کمکی ====================
function getRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// ==================== تابع اصلی ====================
async function main() {
  console.log('⏳ شروع به پاک‌سازی دیتابیس...');

  // ۱. پاک کردن داده‌های قبلی (به ترتیب وابستگی‌ها)
  await prisma.application.deleteMany();
  await prisma.job.deleteMany();
  await prisma.user.deleteMany();
  console.log('🗑️ داده‌های قبلی با موفقیت پاک شدند.');

  // ۲. ساخت کاربران تستی
  console.log('👥 در حال ساخت کاربران تستی...');
  const hashedPassword = await bcrypt.hash('123456', 10);

  const candidateUser = await prisma.user.create({
    data: {
      name: 'علی رضایی (کارجو)',
      email: 'candidate@example.com',
      password: hashedPassword,
      role: 'candidate',
    },
  });

  const employerUser = await prisma.user.create({
    data: {
      name: 'شرکت فناوری (کارفرما)',
      email: 'employer@example.com',
      password: hashedPassword,
      role: 'employer',
    },
  });
  console.log(`✅ کاربران ساخته شدند: ${candidateUser.email} و ${employerUser.email} (رمز: 123456)`);

  // ۳. ساخت ۱۰۰ آگهی شغلی
  console.log('💼 در حال ساخت ۱۰۰ آگهی شغلی...');
  const jobsToInsert = [];
  
  for (let i = 0; i < 100; i++) {
    const template = getRandom(jobTemplates);
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - randomDaysAgo);

    jobsToInsert.push({
      title: template.title,
      companyName: getRandom(companyNames),
      location: getRandom(locations),
      salary: Math.random() > 0.15 ? template.salary : null, // ۱۵٪ آگهی‌ها حقوق ندارند
      jobType: getRandom(jobTypes),
      isUrgent: Math.random() > 0.8, // ۲۰٪ فوری
      description: template.description,
      requirements: template.requirements,
      benefits: template.benefits,
      createdAt,
      updatedAt: new Date(),
    });
  }

  await prisma.job.createMany({ data: jobsToInsert });
  console.log(`✅ ۱۰۰ آگهی شغلی ساخته شد.`);

  // ۴. ساخت چند درخواست شغلی (Application) برای کاربر کارجو
  console.log('📝 در حال ساخت درخواست‌های شغلی تستی...');
  
  // گرفتن ۳ آگهی تصادفی برای ارسال رزومه
  const randomJobs = await prisma.job.findMany({ take: 3 });
  
  if (randomJobs.length > 0) {
    await prisma.application.createMany({
      data: [
        { userId: candidateUser.id, jobId: randomJobs[0].id, status: 'pending' },
        { userId: candidateUser.id, jobId: randomJobs[1].id, status: 'accepted' },
        ...(randomJobs[2] ? [{ userId: candidateUser.id, jobId: randomJobs[2].id, status: 'rejected' }] : []),
      ],
    });
    console.log(`✅ ۳ درخواست شغلی برای کاربر ${candidateUser.email} ساخته شد.`);
  }

  console.log('🎉 عملیات Seed با موفقیت به پایان رسید!');
}

// ==================== اجرا ====================
main()
  .catch((e) => {
    console.error('❌ خطا در ثبت داده‌ها:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });