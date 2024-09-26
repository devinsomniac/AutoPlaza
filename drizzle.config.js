/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:rR2D5kMfICAy@ep-tiny-wildflower-a5j0ou5b.us-east-2.aws.neon.tech/autoPlaza?sslmode=require',
    }
  };