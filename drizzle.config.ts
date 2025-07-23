import {defineConfig} from 'drizzle-kit';
import 'dotenv/config';

//Config da CLI do drizzle
export default defineConfig({
    dialect: 'postgresql',
    schema: './src/db/schema.ts',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    }
});