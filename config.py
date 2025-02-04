class Config:
    # Redis 缓存配置
    CACHE_TYPE = 'redis'
    CACHE_REDIS_HOST = 'localhost'
    CACHE_REDIS_PORT = 6379
    CACHE_REDIS_DB = 0
    
    # 限流存储配置
    RATELIMIT_STORAGE_URL = 'redis://localhost:6379/1'
    
    # 其他配置... 