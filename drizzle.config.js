/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL,
    }
};
