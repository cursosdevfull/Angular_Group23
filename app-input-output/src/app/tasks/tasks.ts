import { Component } from '@angular/core';
import { TaskForm } from '../task-form/task-form';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-tasks',
  imports: [TaskForm, TaskList],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  tasks = [
    'Retrieve discounts undefined',
    'Increase to 2 minutes for waiting in events',
    'Fix error in run step functions without parameters',
  ];

  save(task: string) {
    this.tasks.push(task);
  }

  delete(idx: number) {
    if (confirm('Are you sure? Do you want this task?')) {
      this.tasks.splice(idx, 1);
    }
  }
}
