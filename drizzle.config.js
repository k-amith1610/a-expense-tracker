/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://expensetracker_owner:wrvpaM5eK4kS@ep-aged-hall-a5dt5a0b.us-east-2.aws.neon.tech/expensetracker?sslmode=require',
    }
};
