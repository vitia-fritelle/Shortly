import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.PORT,
    connectionString: process.env.DATABASE_URL,
    database: {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_NAME,
        url: process.env.DATABASE_URL,
    },
    secretKey: process.env.SECRET_KEY,
};

export default config;
