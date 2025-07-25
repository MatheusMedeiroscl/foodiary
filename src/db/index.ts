import { drizzle } from "drizzle-orm/neon-http";
import * as  schema from './schema'
//Usa do drizzle orm para mandar o schema que serão as tables
export const db = drizzle(process.env.DATABASE_URL!, { schema });