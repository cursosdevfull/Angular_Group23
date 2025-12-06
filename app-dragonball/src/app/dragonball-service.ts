import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { environment } from '../environment';
import { IDragonBall, Item } from './dragonball-interface';
import { filter, Observable, switchMap } from 'rxjs';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DragonBallService {
  private http = inject(HttpClient);
  currentPage = signal<number>(1);
  private currentPageSelected = toObservable(this.currentPage).pipe(
    switchMap((val) => this.getByPage(val, 20)),
  );
  characters = toSignal(this.currentPageSelected, { initialValue: {} as IDragonBall });

  currentCharacter = signal<number>(0);
  private currentCharacterSelected = toObservable(this.currentCharacter).pipe(
    filter((val) => val !== 0),
    switchMap((val) => this.getCharacter(val)),
  );
  character = toSignal(this.currentCharacterSelected, { initialValue: {} as Item });

  getByPage(page: number, limit: number): Observable<IDragonBall> {
    return this.http.get<IDragonBall>(
      `${environment.apiDragonBall}/characters?page=${page}&limit=${limit}`,
    );
  }

  getCharacter(id: number): Observable<Item> {
    return this.http.get<Item>(`${environment.apiDragonBall}/characters/${id}`);
  }
}
