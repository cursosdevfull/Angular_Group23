import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Profile } from './profile/profile';
import { Home } from '../home/home';
import { Dashboard } from './dashboard/dashboard';
import { Tasks } from './tasks-reactive-forms/tasks';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Profile, Home, Dashboard, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app-components');
}
