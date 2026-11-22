import 'dotenv/config'; // ✅ بارگذاری فایل .env
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // ✅ خواندن آدرس از process.env
    url: process.env.DATABASE_URL,
  },
});