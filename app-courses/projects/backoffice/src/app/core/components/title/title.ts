import { Component, input } from '@angular/core';

@Component({
  selector: 'cdev-title',
  imports: [],
  templateUrl: './title.html',
  styleUrl: './title.css',
})
export class Title {
  title = input<string>();
}
