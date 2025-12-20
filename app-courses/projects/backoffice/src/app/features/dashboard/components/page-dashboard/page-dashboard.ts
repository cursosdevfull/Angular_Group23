import { Component, inject } from '@angular/core';
import { Layout } from '../../../../core/services/layout';
import { Container } from '../../../../core/components/container/container';

@Component({
  selector: 'cdev-page-dashboard',
  imports: [Container],
  templateUrl: './page-dashboard.html',
  styleUrl: './page-dashboard.css',
})
export class PageDashboard {
  layout = inject(Layout);

  constructor() {
    this.layout.config = {
      visibilityMenu: true,
      visibilityHeader: true
    }
  }
}
