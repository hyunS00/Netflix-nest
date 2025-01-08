import { Injectable, NotFoundException } from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
}
@Injectable()
export class AppService {
  private movies: Movie[] = [
    {
      id: 1,
      title: '아케인',
    },
    {
      id: 2,
      title: '스토브리그',
    },
  ];
  private idCounter = 3;

  getManyMovies(title: string) {
    if (!title) {
      return this.movies;
    }

    return this.movies.filter((m) => m.title.startsWith(title));
  }

  getMovieById(id: number) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 영화 ID입니다.');
    }

    return movie;
  }

  createMovie(title: string) {
    const movie: Movie = {
      id: this.idCounter++,
      title: title,
    };

    this.movies.push(movie);
    return movie;
  }
}
