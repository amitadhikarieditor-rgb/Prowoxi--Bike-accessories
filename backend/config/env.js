import 'dotenv/config';
export const env={
 nodeEnv:process.env.NODE_ENV||'development',
  port:Number(process.env.PORT||5000),
   clientUrl:process.env.CLIENT_URL||'http://localhost:5173',
 mongoUri:process.env.MONGO_URI||'mongodb://127.0.0.1:27017/provoxi',
 accessSecret:process.env.JWT_ACCESS_SECRET||'dev-access-secret-change-me',
  refreshSecret:process.env.JWT_REFRESH_SECRET||'dev-refresh-secret-change-me',
 accessMinutes:Number(process.env.ACCESS_TOKEN_MINUTES||15), 
 refreshDays:Number(process.env.REFRESH_TOKEN_DAYS||7),
 redisUrl:process.env.REDIS_URL||'', 
 razorpayKeyId:process.env.RAZORPAY_KEY_ID||'',
  razorpayKeySecret:process.env.RAZORPAY_KEY_SECRET||'',
   razorpayWebhookSecret:process.env.RAZORPAY_WEBHOOK_SECRET||'',

 smtpHost:process.env.SMTP_HOST||'', 
 smtpPort:Number(process.env.SMTP_PORT||587),
  smtpUser:process.env.SMTP_USER||'', 
  smtpPassword:process.env.SMTP_PASSWORD||'',
   mailFrom:process.env.MAIL_FROM||'amitadhikarieditor@gmail.com',
};
