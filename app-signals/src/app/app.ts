import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListStarWarsShips } from './list-star-wars-ships/list-star-wars-ships';

@Component({
  selector: 'app-root',
  imports: [ListStarWarsShips],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
