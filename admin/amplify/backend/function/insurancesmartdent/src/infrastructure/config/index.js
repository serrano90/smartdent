const dotenv = require("dotenv");
dotenv.config()

module.exports = {
    app: {
        name: process.env.APP_NAME,
        port: process.env.APP_PORT,
        url: process.env.APP_URL,
        env: process.env.ENV,
    },
    aws: {
        region: process.env.REGION,
    },
    cors: {
        url: process.env.CORS_URL.split(",")
    },
    database: {
        region: process.env.TABLE_REGION,
    },
    flowCL: {
        apiKey: process.env.FLOWCL_API_KEY,
        secretKey: process.env.FLOWCL_SECRET_KEY,
        apiURL: process.env.FLOWCL_API_URL,
        baseURL: process.env.FLOWCL_BASE_URL,
        baseAdminURL: process.env.FLOWCL_BASE_ADMIN_URL,
        baseUpdateCardURL: process.env.FLOWCL_BASE_URL_THANK_YOU_PAGE,
        registerByPage: parseInt(process.env.FLOWCL_REGISTER_BY_PAGE)
    },
    mail:{
        from: process.env.MAIL_FROM,
        subject: process.env.MAIL_SUBJECT
    },
    sii: {
        baseURL: process.env.SII_SERVICE_URL,
    },
    awsRemote: {
        accessKeyI: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    }
}