import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
const sql = neon('postgresql://expensetracker_owner:wrvpaM5eK4kS@ep-aged-hall-a5dt5a0b.us-east-2.aws.neon.tech/expensetracker?sslmode=require');
export const db = drizzle(sql, {schema});