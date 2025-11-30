import { Component } from '@angular/core';

@Component({
  selector: 'app-promises',
  imports: [],
  templateUrl: './promises.html',
  styleUrl: './promises.css',
})
export class Promises {
  data: any[] = [];
  posts: any[] = [];

  async loadUsers() {
    const promise = new Promise<any>((resolve, reject) => {
      const xHttp = new XMLHttpRequest();
      xHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          resolve(JSON.parse(xHttp.responseText));
        }

        if (this.readyState === 4 && this.status >= 400 && this.status < 600) {
          reject();
        }
      };
      xHttp.open('get', 'https://jsonplaceholder.typicode.com/users');
      xHttp.send();
    });

    this.data = await promise;

    /*promise.then((data) => {
      console.log('data', data);
    });

    promise.catch(() => {
      console.log('An error happened');
    });*/

    /*promise
      .then((data) => {
        console.log('data', data);
      })
      .catch(() => {
        console.log('An error happened');
      });*/

    /*promise.then(
      (data) => {
        console.log('data', data);
      },
      () => {
        console.log('An error happened');
      },
    );*/
  }

  loadPosts(userId: number) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => res.json())
      .then((res) => (this.posts = res));
  }
}
