import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContainer, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'cdev-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogContent, MatDialogActions, MatToolbarModule, ReactiveFormsModule],
  templateUrl: './form-course.html',
  styleUrl: './form-course.css',
  encapsulation: ViewEncapsulation.None
})
export class FormCourse {
  dataInjected = inject(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef<FormCourse>)
  title = this.dataInjected ? 'Edit' : 'New';

  fg: FormGroup

  constructor() {
    this.fg = new FormGroup({
      id: new FormControl(this.dataInjected?.id),
      title: new FormControl(this.dataInjected?.title, Validators.required),
    });
  }

  save() {
    if (this.fg.valid) {
      this.dialogRef.close(this.fg.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
