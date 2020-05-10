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
  accessKeyId: 'AKIAJX7YVJRTTC3IHLQQ',
  secretAccessKey: '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',
  mongoURI:
    'mongodb+srv://m001-student:m001-mongodb-basics@sandbox-nxgb1.mongodb.net/test?retryWrites=true&w=majority',
  S3Store: 'impact-mtaas-artifact-store',
};
