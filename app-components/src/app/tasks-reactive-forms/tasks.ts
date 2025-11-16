//import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

// function Component(params: any) {
//   return (target: new (...args: any[]) => any) => {
//      const instance = new target()
//      const btn = document.querySelector("button")
//      btn.addEventListener("click", () => instance.addTask())
//   }
// }

@Component({
  selector: 'app-tasks',
  imports: [ReactiveFormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  taskName = new FormControl();
  list = [
    'Add metadata to crawler invoices',
    "Fix lambda get teams in step functions 'stripe'",
    'Improve error middleware in lambdas',
  ];

  constructor() {
    this.taskName.valueChanges.subscribe({
      next: (data) => console.log(data),
    });
  }

  addTask() {
    //this.list.push(`Task ${this.list.length}`);
    this.list.push(this.taskName.value);
    this.taskName.setValue('');
  }
}
