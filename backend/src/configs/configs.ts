interface IConfig {
    PORT: string;
    MONGO_URI: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_LIFETIME: any;
    JWT_REFRESH_LIFETIME: any;
    ACTION_ACTIVATE_SECRET: string;
    ACTION_ACTIVATE_LIFETIME: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
}

const config: IConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME,
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETI,
    ACTION_ACTIVATE_SECRET: process.env.ACTION_ACTIVATE_SECRET,
    ACTION_ACTIVATE_LIFETIME: process.env.ACTION_ACTIVATE_LIFETIME,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
};

export { config };
