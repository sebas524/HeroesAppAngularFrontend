import { Component, OnInit, inject } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroInterface } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-list-page',
  templateUrl: './hero-list-page.component.html',
  styleUrls: ['./hero-list-page.component.css'],
})
export class HeroListPageComponent implements OnInit {
  private heroesService = inject(HeroesService);
  public heroes: HeroInterface[] = [];
  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((response) => {
      this.heroes = response;
      console.log('response =>', response);

      return console.log('xxxxx', this.heroes);
    });
  }
}
