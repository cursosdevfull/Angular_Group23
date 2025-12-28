import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'cdev-loader',
  imports: [MatProgressBarModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {

}
