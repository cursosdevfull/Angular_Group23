//import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// function Component(params: any) {
//   return (target: new (...args: any[]) => any) => {
//      const instance = new target()
//      const btn = document.querySelector("button")
//      btn.addEventListener("click", () => instance.addTask())
//   }
// }

@Component({
  selector: 'app-tasks',
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  taskName = 'Migrate stripe invoices and discounts';
  list = [
    'Add metadata to crawler invoices',
    "Fix lambda get teams in step functions 'stripe'",
    'Improve error middleware in lambdas',
  ];

  addTask() {
    //this.list.push(`Task ${this.list.length}`);
    this.list.push(this.taskName);
    this.taskName = '';
  }

  captureTask(event: any) {
    this.taskName = event.target.value;
  }
}
