import { Component } from '@angular/core';
import { TECH_BADGES } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly techBadges = TECH_BADGES;
}
