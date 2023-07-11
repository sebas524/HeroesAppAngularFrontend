import { Component, Input, OnInit } from '@angular/core';
import { HeroInterface } from '../../interfaces/hero.interface';
import { UserFound } from '../../interfaces/getHeroRes.interface';

@Component({
  selector: 'app-card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() public hero!: UserFound;

  ngOnInit(): void {
    if (!this.hero) {
      throw Error('Hero property is missing!');
    }
  }
}
