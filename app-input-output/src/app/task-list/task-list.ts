import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  @Input() list!: string[];
  @Output() onDelete: EventEmitter<number> = new EventEmitter();

  delete(idx: number) {
    this.onDelete.emit(idx);
  }
}
