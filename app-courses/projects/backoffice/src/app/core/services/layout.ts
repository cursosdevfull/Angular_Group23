import { Injectable, signal } from '@angular/core';
import { ILayout } from '../interfaces/layout';

@Injectable({
  providedIn: 'root',
})
export class Layout {
  private _config = signal<ILayout>({
    visibilityMenu: false,
    visibilityHeader: false
  })

  private _visibilityLoader = signal<boolean>(false);

  set config(value: ILayout) {
    this._config.set(value);
  }

  get config() {
    return this._config();
  }

  set loader(value: boolean) {
    this._visibilityLoader.set(value);
  }

  get loader() {
    return this._visibilityLoader();
  }
}
