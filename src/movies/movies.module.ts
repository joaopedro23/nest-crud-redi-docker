// src/movies/movies.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { RedisConfigModule } from 'src/config/redis.config';

// atualiza para isso 

    @Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        RedisConfigModule,
    ],
    controllers: [MoviesController],
    providers: [MoviesService],
})

export class MoviesModule {}