import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// ==================== تنظیمات اتصال به دیتابیس ====================
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('❌ متغیر DATABASE_URL در فایل .env تعریف نشده است.');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ==================== داده‌های پایه ====================

// تعریف تایپ برای موقعیت‌های شغلی (برای تولید متن‌های باورپذیرتر)
interface JobTemplate {
  title: string;
  category: string;
  minSalary: string;
  maxSalary: string;
  skills: string[];
  benefits: string[];
}

const jobTemplates: JobTemplate[] = [
  {
    title: 'توسعه‌دهنده ارشد فرانت‌اند (React)',
    category: 'فنی و مهندسی',
    minSalary: '۳۰ تا ۴۰ میلیون',
    maxSalary: '۵۰ میلیون به بالا',
    skills: ['تسلط کامل به React و TypeScript', 'آشنایی با Next.js', 'تجربه کار با Tailwind CSS', 'توانایی مدیریت State (مانند Zustand یا Redux)'],
    benefits: ['بیمه تکمیلی', 'امکان دورکاری', 'غذای رایگان', 'پاداش عملکرد'],
  },
  {
    title: 'برنامه‌نویس بک‌اند (Node.js)',
    category: 'فنی و مهندسی',
    minSalary: '۲۵ تا ۳۵ میلیون',
    maxSalary: '۴۰ تا ۵۰ میلیون',
    skills: ['تسلط به Node.js و Express', 'آشنایی با دیتابیس PostgreSQL', 'تجربه کار با Prisma یا TypeORM', 'آشنایی با Docker'],
    benefits: ['بیمه تکمیلی', 'ساعت کاری منعطف', 'توسعه مهارت‌ها'],
  },
  {
    title: 'طراح UI/UX',
    category: 'طراحی',
    minSalary: '۲۰ تا ۳۰ میلیون',
    maxSalary: '۳۵ تا ۴۵ میلیون',
    skills: ['تسلط به Figma', 'آشنایی با اصول طراحی تجربه کاربری', 'توانایی ساخت پروتوتایپ', 'درک عمیق از Design System'],
    benefits: ['محیط خلاقانه', 'بیمه تکمیلی', 'دوره‌های آموزشی'],
  },
  {
    title: 'کارشناس دیجیتال مارکتینگ',
    category: 'بازاریابی',
    minSalary: '۱۵ تا ۲۰ میلیون',
    maxSalary: '۲۵ تا ۳۵ میلیون',
    skills: ['آشنایی با ابزارهای تحلیل (Google Analytics)', 'تجربه در کمپین‌های تبلیغاتی', 'تسلط به سئو و SEM', 'توانایی تولید محتوا'],
    benefits: ['پاداش عملکرد', 'بیمه تکمیلی', 'تفریحات تیمی'],
  },
  {
    title: 'مدیر محصول (Product Manager)',
    category: 'مدیریت',
    minSalary: '۳۵ تا ۴۵ میلیون',
    maxSalary: '۵۰ میلیون به بالا',
    skills: ['تجربه در مدیریت محصولات دیجیتال', 'توانایی تحلیل داده', 'مهارت‌های ارتباطی قوی', 'آشنایی با Agile و Scrum'],
    benefits: ['بیمه تکمیلی', 'پاداش عملکرد', 'امکان ارتقاء'],
  },
  {
    title: 'کارآموز برنامه‌نویسی',
    category: 'فنی و مهندسی',
    minSalary: '۵ تا ۱۰ میلیون',
    maxSalary: '۱۰ تا ۱۵ میلیون',
    skills: ['آشنایی مقدماتی با یک زبان برنامه‌نویسی', 'علاقه به یادگیری', 'توانایی کار تیمی', 'مسئولیت‌پذیری'],
    benefits: ['محیط آموزشی', 'منتورینگ', 'امکان جذب پس از دوره'],
  },
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

// انتخاب یک عضو تصادفی از آرایه
function getRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// تولید توضیحات کامل و باورپذیر بر اساس الگوی شغلی
function generateJobDetails(template: JobTemplate) {
  const experienceLevel = template.title.includes('ارشد') ? 'سنیور' : template.title.includes('کارآموز') ? 'کارآموز' : 'جونیور';
  
  const description = `ما در شرکت ${getRandom(companyNames)} به دنبال یک ${template.title} با انگیزه و خلاق هستیم تا به تیم ${template.category} ما بپیوندد. 
  
در این نقش، شما با جدیدترین تکنولوژی‌ها کار خواهید کرد و نقش کلیدی در موفقیت پروژه‌های ما خواهید داشت. محیط کار ما پویا، صمیمی و حمایت‌گر است و فرصت‌های رشد فراوانی برای شما فراهم می‌کند.`;

  const requirements = template.skills.map(skill => `• ${skill}`).join('\n') + `\n• سطح تجربه: ${experienceLevel}`;

  const benefits = template.benefits.map(benefit => `• ${benefit}`).join('\n') + `\n• حقوق: ${template.minSalary} تا ${template.maxSalary}`;

  return { description, requirements, benefits };
}

// ==================== تابع اصلی ====================
async function main() {
  console.log('⏳ شروع به ساخت ۱۰۰ آگهی شغلی واقع‌گرایانه...');

  // پاک کردن داده‌های قبلی
  await prisma.application.deleteMany(); // پاک کردن درخواست‌ها برای جلوگیری از خطای کلید خارجی
  await prisma.job.deleteMany();
  console.log('🗑️ داده‌های قبلی پاک شدند.');

  const jobsToInsert = [];

  for (let i = 0; i < 100; i++) {
    // انتخاب یک الگوی شغلی تصادفی
    const template = getRandom(jobTemplates);
    
    // تولید تاریخ تصادفی در ۳۰ روز گذشته
    const randomDaysAgo = Math.floor(Math.random() * 30);
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - randomDaysAgo);

    // تولید توضیحات
    const { description, requirements, benefits } = generateJobDetails(template);

    const newJob = {
      title: template.title,
      companyName: getRandom(companyNames),
      location: getRandom(locations),
      salary: Math.random() > 0.1 ? getRandom([template.minSalary, template.maxSalary]) : null, // ۱۰٪ احتمال نداشتن حقوق
      jobType: getRandom(jobTypes),
      isUrgent: Math.random() > 0.8,
      description: description,
      requirements: requirements,
      benefits: benefits,
      createdAt: createdAt,
      updatedAt: new Date(),
    };

    jobsToInsert.push(newJob);
  }

  // درج تمام ۱۰۰ آگهی به صورت یکجا
  await prisma.job.createMany({
    data: jobsToInsert,
  });

  console.log('✅ ۱۰۰ آگهی شغلی با توضیحات کامل در دیتابیس ثبت شدند!');
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