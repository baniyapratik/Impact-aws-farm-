const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
  redisHOST: process.env.REDIS_HOST,
  redisPORT: process.env.REDIS_PORT,
  mongodbHOST: process.env.MONGODB_HOST,
  mongodbPORT: process.env.MONGODB_PORT,
  mongoUser: process.env.MONGODB_USER,
  mongoPassword: process.env.MONGODB_PASS,
  mongodb: process.env.MONGODB,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  mongoURI: 'mongodb://mongo:27017/devicefarm',
  S3Store: 'impact-mtaas-artifact-store',
};
