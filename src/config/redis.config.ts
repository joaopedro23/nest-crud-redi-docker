import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModuleOptions } from '@nestjs/common/cache/interfaces/cache-module.interface';
import { redisStore } from 'cache-manager-redis-yet';
@Module({
  imports: [
    CacheModule.registerAsync<CacheModuleOptions>({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST', 'localhost'),
        port: configService.get<number>('REDIS_PORT', 6379),
        ttl: configService.get<number>('CACHE_TTL', 600),
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisConfigModule {}
