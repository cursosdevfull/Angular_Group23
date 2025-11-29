import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { Loader } from '../loader/loader';

@Component({
  selector: 'app-list-star-wars-ships',
  imports: [Loader],
  templateUrl: './list-star-wars-ships.html',
  styleUrl: './list-star-wars-ships.css',
})
export class ListStarWarsShips {
  loading: WritableSignal<boolean> = signal(false);
  data = signal<any | undefined>(undefined);
  urlFilm = signal<string | undefined>(undefined);
  infoFilm = signal<any | undefined>(undefined);

  starShips = computed(() => {
    if (!this.data()) {
      return [];
    } else {
      return this.data().results;
    }
  });

  constructor() {
    effect(() => {
      const url = this.urlFilm();

      if (url) {
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            this.infoFilm.set(res);
          });
      }
    });
  }

  loadStarShips() {
    this.loading.set(true);
    fetch('https://swapi.dev/api/starships')
      .then((res) => res.json())
      .then(async (res) => {
        await this.delay(2000);
        this.loading.update((prevState) => !prevState);
        this.data.set(res);
      });
  }

  delay(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(true), time);
    });
  }

  showFilm(urlFilm: string) {
    this.urlFilm.set(urlFilm);
  }
}
