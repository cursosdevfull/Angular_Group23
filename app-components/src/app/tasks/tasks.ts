//import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';

// function Component(params: any) {
//   return (target: new (...args: any[]) => any) => {
//      const instance = new target()
//      const btn = document.querySelector("button")
//      btn.addEventListener("click", () => instance.addTask())
//   }
// }

@Component({
  selector: 'app-tasks',
  imports: [
    /*NgForOf*/
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  taskName = '';
  list = [
    'Add metadata to crawler invoices',
    "Fix lambda get teams in step functions 'stripe'",
    'Improve error middleware in lambdas',
  ];

  addTask() {
    //this.list.push(`Task ${this.list.length}`);
    this.list.push(this.taskName);
  }

  captureTask(event: any) {
    this.taskName = event.target.value;
  }
}
