import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cdev-confirm',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css',
})
export class Confirm {
  message: string = 'Are you sure you want to proceed?';
}
