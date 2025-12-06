import { Component, computed, Inject, signal } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { RouterOutlet } from '@angular/router';
import { DragonBallService } from './dragonball-service';
import { Gender, IDragonBall } from './dragonball-interface';
import { JsonPipe } from '@angular/common';
import { Dragon } from './app.config';
import { List } from './list/list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, List /*JsonPipe*/],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(/*@Inject('DragonService') readonly service: DragonBallService*/) {
    /*service.getByPage(1, 20).subscribe({
      next: (resp) => {
        //this.data = resp;
        this.data.set(resp);
      },
    });*/
    //this.data = service.characters
  }
}
