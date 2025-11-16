import { Component } from '@angular/core';

// const doc = document.querySelector("[base-initial]")
// <base-initial></base-initial>
// const instance = new target()
// const text = instance.title
// doc.innerHTML = `<h1>${text}</h1>`

@Component({
  selector: '[base-initial="todo"]',
  templateUrl: './home.html',
  styleUrl: './home.css',
  //standalone: false,
})
export class Home {
  title = 'Título Home';
}
