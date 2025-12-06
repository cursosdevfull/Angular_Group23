import { Routes } from '@angular/router';
import { RxInterval } from './rx-interval/rx-interval';
import { RxLeaks } from './rx-leaks/rx-leaks';

export const routes: Routes = [
  {
    path: '',
    component: RxInterval,
  },
  {
    path: 'leaks',
    component: RxLeaks,
  },
];
