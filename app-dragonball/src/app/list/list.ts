import { Component, computed, effect, inject, signal } from '@angular/core';
import { DragonBallService } from '../dragonball-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [NgClass],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  service = inject(DragonBallService);
  //data = signal<IDragonBall | undefined>(undefined);
  characters = computed(() => {
    return this.service.characters();
  });

  totalPages = signal<number[]>([]);
  currentPage = signal<number>(0);
  showModal = signal<boolean>(false);

  character = computed(() => {
    return this.service.character();
  });

  constructor() {
    effect(() => {
      const meta = this.characters().meta;
      if (meta) {
        this.currentPage.set(meta.currentPage);
        this.totalPages.set(Array.from({ length: meta.totalPages }, (_, i) => i + 1));
      }
    });

    effect(() => {
      if (this.service.character().id) {
        this.showModal.set(true);
      }
    });
  }

  changePage(evt: PointerEvent, page: number) {
    evt.preventDefault();
    this.service.currentPage.set(page);
  }

  showDetails(id: number) {
    this.service.currentCharacter.set(id);
  }

  closeModal() {
    this.showModal.set(false);
  }
}
