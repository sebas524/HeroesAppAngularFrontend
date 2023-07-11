import { Component, OnInit, inject } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroRes, SavedHero } from '../../interfaces/heroRes.interface';
import { map } from 'rxjs';
import { HeroInterface } from '../../interfaces/hero.interface';
import { FoundHero } from '../../interfaces/allHeroes.interface';

@Component({
  selector: 'app-hero-list-page',
  templateUrl: './hero-list-page.component.html',
  styleUrls: ['./hero-list-page.component.css'],
})
export class HeroListPageComponent implements OnInit {
  private heroesService = inject(HeroesService);
  public heroes: FoundHero[] = [];
  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe((response) => {
      this.heroes = response;
      console.log('response =>', response);

      return console.log('xxxxx', this.heroes);
    });
  }
}
