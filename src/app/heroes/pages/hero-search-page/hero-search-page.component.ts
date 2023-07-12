import { Component, OnInit, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { HeroInterface } from '../../interfaces/hero.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-search-page',
  templateUrl: './hero-search-page.component.html',
  styleUrls: ['./hero-search-page.component.css'],
})
export class HeroSearchPageComponent implements OnInit {
  private heroesService = inject(HeroesService);
  private router = inject(Router);
  private searchSubscription: Subscription | undefined;

  public searchControl = new FormControl();
  public heroes: HeroInterface[] = [];
  public hero: HeroInterface | undefined;

  constructor() {}
  ngOnInit(): void {
    this.searchSubscription = this.searchControl.valueChanges
      .pipe(
        switchMap((query) => {
          if (query) {
            return this.heroesService.getHeroesByLetter(query);
          } else {
            // Clear the heroes array when the query is empty
            this.heroes = [];
            return [];
          }
        })
      )
      .subscribe((results) => {
        this.heroes = results;
        console.log('OOOOOOOO', results);
      });
  }

  onOptionSelected(event: any) {
    const selectedResult = event.option.value;

    console.log('XXX: ', selectedResult);

    // Redirect to the desired route based on the selected result
    this.router.navigateByUrl(`/heroes/${selectedResult}`); // Replace '/details' with your desired route
  }
}
