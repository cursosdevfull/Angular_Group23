import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  @Output() onNewTask = new EventEmitter();

  taskFormControl = new FormControl();

  save() {
    const value = this.taskFormControl.value;
    this.onNewTask.emit(value);
    this.taskFormControl.setValue('');
  }
}
