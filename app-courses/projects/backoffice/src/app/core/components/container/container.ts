import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Title } from '../title/title';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-om-perfect-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Navigation } from '../navigation/navigation';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@Component({
  selector: 'cdev-container',
  imports: [MatCardModule, Title, PerfectScrollbarModule, MatButtonModule, MatIconModule, Navigation],
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
  hasMore = input<boolean>(false);
  currentPage = input<number>(1);
  onChangePage = output<number>();

  changePage(page: number) {
    this.onChangePage.emit(page);
  }

}
