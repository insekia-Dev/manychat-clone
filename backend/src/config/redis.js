const redis = require('redis');
const logger = require('../utils/logger');

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      url: process.env.REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 500),
        connectTimeout: 10000
      }
    });

    redisClient.on('error', (err) => logger.error('Redis Error:', err));
    redisClient.on('connect', () => logger.info('✅ Redis Connected'));
    redisClient.on('ready', () => logger.info('✅ Redis Ready'));
    redisClient.on('reconnecting', () => logger.warn('⚠️ Redis Reconnecting'));

    await redisClient.connect();
    return redisClient;
  } catch (error) {
    logger.error(`❌ Redis connection failed: ${error.message}`);
    process.exit(1);
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };