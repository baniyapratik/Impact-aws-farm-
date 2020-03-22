module.exports = {
    redisHOST: process.env.REDIS_HOST,
    redisPORT: process.env.REDIS_PORT,
    mongodbHOST: process.env.MONGODB_HOST, 
    mongodbPORT: process.env.MONGODB_PORT, 
    mongoUser: process.env.MONGODB_USER, 
    mongoPassword: process.env.MONGODB_PASS,
    mongoURI: "mongodb://"+ mongoUser + ":" + mongoPassword+ "@" + mongodbHOST+":" + mongodbPORT
}