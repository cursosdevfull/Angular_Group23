import { Component } from '@angular/core';
import { Deactivate } from '../deactivate.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements Deactivate {

  original = 'Sergio';
  title = 'Sergio';

  hasUnsavedChanges(): boolean {
    // Implement your logic to check for unsaved changes here
    return this.original !== this.title;
  }

  save() {
    this.original = this.title;
  }

}
