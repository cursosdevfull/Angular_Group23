import { Component, inject } from '@angular/core';
import { Layout } from '../../../../core/services/layout';
import { Login } from '../login/login';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'cdev-page-login',
  imports: [Login, LottieComponent],
  templateUrl: './page-login.html',
  styleUrl: './page-login.css',
})
export class PageLogin {
  layout = inject(Layout)

  options: AnimationOptions = {
    path: '/assets/lotties/education.json',
  };

  constructor() {
    this.layout.config = {
      visibilityMenu: false,
      visibilityHeader: false
    }
  }
}
