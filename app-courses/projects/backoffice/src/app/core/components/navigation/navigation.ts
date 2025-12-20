import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cdev-navigation',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  hasMore = input<boolean>(false);
  currentPage = input<number>(1);
  onChangePage = output<number>();

  onDirection(direction: number) {
    this.onChangePage.emit(this.currentPage() + direction);
  }
}
