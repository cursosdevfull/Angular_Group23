import { Component, ElementRef, inject, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Title } from '../title/title';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-om-perfect-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@Component({
  selector: 'cdev-container',
  imports: [MatCardModule, Title, PerfectScrollbarModule, MatButtonModule, MatIconModule],
  templateUrl: './container.html',
  styleUrl: './container.css',
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class Container {
  title = input<string>();
  el = inject(ElementRef);

  hasFilters = signal<boolean>(false)

  ngAfterContentInit() {
    const filters = this.el.nativeElement.querySelector('.filters');

    this.hasFilters.set(!!filters);
  }

}
