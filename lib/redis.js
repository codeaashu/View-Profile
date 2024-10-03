import Redis from "ioredis";

// Singleton pattern for Redis client
let redisInstance;

function getRedisClient() {
  if (!redisInstance) {
    redisInstance = new Redis(process.env.REDIS_URL, {
      connectTimeout: 10000, // 10 seconds
      retryStrategy: (times) => {
        // Exponential backoff with a maximum delay of 2 seconds
        const baseDelay = Math.min(times * 100, 2000);
        const jitter = Math.random() * 1000; // Random delay up to 1 second
        return baseDelay + jitter;
      },
    });

    redisInstance.on("error", (err) => {
      console.error("Redis error:", err);
    });

    // Graceful shutdown for Redis client
    async function shutdown() {
      try {
        await redisInstance.quit();
        console.log("Redis connection closed gracefully");
      } catch (err) {
        console.error("Error closing Redis connection:", err);
      } finally {
        process.exit(0);
      }
    }

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown); // Handle interrupts (e.g., Ctrl+C)
  }

  return redisInstance;
}

const redis = getRedisClient();

export default redis;

const redis_expire = process.env.REDIS_EXPIRE;

export async function handleRedisOperation(
  operation,
  key,
  value = null,
  expire = redis_expire
) {
  try {
    let result;
    switch (operation) {
      case "get":
        result = await redis.get(key);
        break;
      case "set":
        result = expire
          ? await redis.set(key, value, "EX", expire)
          : await redis.set(key, value);
        break;
      case "del":
        result = await redis.del(key);
        break;
      default:
        throw new Error("Unsupported Redis operation.");
    }
    return result;
  } catch (error) {
    throw new Error(`Error in handleRedisOperation: ${error.message}`);
  }
}

export async function updateUserCache(user, oldUsername = null) {
  try {
    if (oldUsername)
      await handleRedisOperation("del", `username:${oldUsername}`);

    await Promise.all([
      handleRedisOperation("set", `username:${user.username}`, user.email),
      handleRedisOperation("set", `email:${user.email}`, JSON.stringify(user)),
    ]);
  } catch (error) {
    throw new Error(`Error in updateUserCache: ${error.message}`);
  }
}
