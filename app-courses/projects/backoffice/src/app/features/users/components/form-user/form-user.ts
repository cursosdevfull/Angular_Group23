import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'cdev-form-user',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSelectModule],
  templateUrl: './form-user.html',
  styleUrl: './form-user.css',
  encapsulation: ViewEncapsulation.None
})
export class FormUser {
  dataInjected = inject(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef<FormUser>)
  userService = inject(UserService)
  title = this.dataInjected ? 'Edit User' : 'New User';

  fg: FormGroup

  roles = this.userService.listRoles

  constructor() {
    this.fg = new FormGroup({
      id: new FormControl(this.dataInjected?.id),
      name: new FormControl(this.dataInjected?.name, Validators.required),
      email: new FormControl(this.dataInjected?.email, [Validators.required, Validators.email]),
      roleIds: new FormControl(this.dataInjected?.roles.map((role: any) => role.id), Validators.required)
    });

    if (this.dataInjected) {
      this.fg.addControl('password', new FormControl(''));
    } else {
      this.fg.addControl('password', new FormControl('', Validators.required));
    }
  }

  save() {
    if (this.fg.valid) {
      const formData = { ...this.fg.value };

      this.dialogRef.close(formData);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
