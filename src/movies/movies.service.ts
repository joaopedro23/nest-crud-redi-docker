// src/movies/movies.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    await this.cacheManager.del('all_movies');// add cache
    return this.moviesRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    const cacheMovies = await this.cacheManager.get<Movie[]>('all_movier')
    if(cacheMovies){
      return cacheMovies
    }
    const allMovies = await this.moviesRepository.find();
    await this.cacheManager.set('all_movies', allMovies, { ttl: 600 });
    return allMovies
  }

  findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {

    await this.moviesRepository.update(id, updateMovieDto);
    await this.cacheManager.del('all_movies');
    return this.moviesRepository.findOne({ where: { id } });

  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
    await this.cacheManager.del('all_movies');
  }
}
