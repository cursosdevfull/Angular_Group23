import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-observables',
  imports: [],
  templateUrl: './observables.html',
  styleUrl: './observables.css',
})
export class Observables {
  data: any[] = [];
  posts: any[] = [];

  async loadUsers() {
    const observable = new Observable((observer: Observer<any>) => {
      const xHttp = new XMLHttpRequest();
      xHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          observer.next(JSON.parse(xHttp.responseText));
        }

        if (this.readyState === 4 && this.status >= 400 && this.status < 600) {
          observer.error('An error happened');
        }
      };
      xHttp.open('get', 'https://jsonplaceholder.typicode.com/users');
      xHttp.send();
    });

    observable.subscribe({
      next: (data) => (this.data = data),
      error: (error) => console.log(error),
      complete: () => console.log('Event complete'),
    });
  }

  loadPosts(userId: number) {
    const observable = new Observable((observer: Observer<any>) => {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((res) => res.json())
        .then((res) => observer.next(res));
    });

    observable.subscribe({
      next: (data) => (this.posts = data),
    });
  }
}
