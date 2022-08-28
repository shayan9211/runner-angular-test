import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from './interface';
import { titles } from '../data/titles';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  movies$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  selected$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  // method to fetch list of movies from 'backend' and update the Subject
  fetchTitles(): BehaviorSubject<Movie[]> {
    this.movies$.next(titles);
    return this.movies$;
  }

  // method to filter and return the filtered array
  filterTitles(val: string, list: Movie[]): Movie[] {
    let result: Movie[] = [];
    if (!list || !list.length || !val || !val.length) return result;
    return list.filter((doc: Movie) => doc.full_name.includes(val.toUpperCase()));
  }
}
