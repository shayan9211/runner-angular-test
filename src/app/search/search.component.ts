import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataServiceService } from '../service/data-service.service';
import { FormControl } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { Movie } from 'src/app/service/interface'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  selected: Movie[] = [];
  subscriptions$: Subscription[] = [];

  constructor(private api: DataServiceService) { }

  ngOnInit(): void {
    // initialize movies list to perform filter operation
    this.subscriptions$.push(
      this.api.movies$
      .subscribe({
        next: (list: Movie[]) => this.movies = list,
        error: (err: Error) => console.error(err)
      })
    );
  };

  ngOnDestroy(): void {
    this.subscriptions$.forEach((sub$: Subscription) => sub$.unsubscribe());
  };

  // input form for filter search
  searchField = new FormControl('');

  // method perform a search and filter the result on keyup with debounceTime, default delay 500ms.
  debounceSearch(delay: number = 500): number {
    this.searchField.valueChanges
    .pipe(debounceTime(delay))
    .subscribe({
      next: (val: any) => {
        this.filteredMovies = this.api.filterTitles(val, this.movies);
      },
      error: (err: Error) => console.error(err)
    });
    return delay;
  };

  // method to select a movie from dropdown autocomplete on click / tap
  select(movie: Movie): Movie[] {
    // initialize the selected list
    this.subscriptions$.push(
      this.api.selected$
      .subscribe({
        next: (list: Movie[]) => this.selected = list,
        error: (err: Error) => console.error(err),
      })
    );
    // if movie has been added to selected list, perform nothing, else add to selected list
    if (
      this.selected.every((doc: Movie) => doc.id !== movie.id)
      ) this.selected = [...this.selected, movie];
    // update the subject
    this.api.selected$.next(this.selected);
    // reset the form field for the next search
    this.searchField.reset();
    return this.selected;
  };

}
