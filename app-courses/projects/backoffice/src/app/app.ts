import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from './core/components/header/header';
import { Layout } from './core/services/layout';
import { Menu } from './core/components/menu/menu';

@Component({
  selector: 'cdev-root',
  imports: [RouterOutlet, MatSidenavModule, Header, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  _layout = inject(Layout)

  layout = computed(() => this._layout.config);

}
