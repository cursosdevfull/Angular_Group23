import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Promises } from './promises/promises';
import { Observables } from './observables/observables';

@Component({
  selector: 'app-root',
  imports: [Promises, Observables],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app-promises-observables');
}
