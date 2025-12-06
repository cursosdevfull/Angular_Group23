import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import {
  filter,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
} from 'rxjs';

class User {
  readonly name: string = '';
  readonly lastname: string = '';

  constructor(name: string, lastname: string) {
    this.name = name;
    this.lastname = lastname;
  }
}

@Component({
  selector: 'app-rx-interval',
  imports: [AsyncPipe],
  templateUrl: './rx-interval.html',
  styleUrl: './rx-interval.css',
})
export class RxInterval {
  //subscription: Subscription;
  valueInterval: Observable<number>;
  readonly http = inject(HttpClient);
  readonly user = new User('Carlos', 'Luque');

  constructor(/*@Inject(HttpClient) private readonly http: HttpClient*/) {
    this.valueInterval = interval(1000);

    /* interval(1000).subscribe({
      next: console.log,
    });*/

    /*const observable = interval(1000);

    this.subscription = observable
      .pipe(
        filter((val) => val > 0),
        take(10),
        //map((val) => val * 100),
        mergeMap((el) => this.http.get(`https://jsonplaceholder.typicode.com/users/${el}`)),
        //switchMap((el) => this.http.get(`https://jsonplaceholder.typicode.com/users/${el}`)),
      )
      .subscribe({
        next: (data) => console.log('data', data),
        });*/
  }

  getUserInformation() {
    console.log('name', this.user.name);
    console.log('lastname', this.user.lastname);
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
