import dotenv, { config } from 'dotenv';

dotenv.config();

const env ={
    port: process.env.PORT || 5000,
    database : process.env.DATABASE_URL,

    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN
};

export default env;