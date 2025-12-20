import { Component, inject } from '@angular/core';
import { Layout } from '../../../../core/services/layout';
import { Container } from '../../../../core/components/container/container';

@Component({
  selector: 'cdev-page-schedules',
  imports: [Container],
  templateUrl: './page-schedules.html',
  styleUrl: './page-schedules.css',
})
export class PageSchedules {
  layout = inject(Layout);

  constructor() {
    this.layout.config = {
      visibilityMenu: true,
      visibilityHeader: true
    }
  }
}
