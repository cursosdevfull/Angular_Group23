import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Teacher } from '../../services/teacher.service';

@Component({
    selector: 'cdev-form-teacher',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogContent,
        MatDialogActions,
        MatToolbarModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatIconModule
    ],
    templateUrl: './form-teacher.html',
    styleUrl: './form-teacher.css',
    encapsulation: ViewEncapsulation.None
})
export class FormTeacher {
    dataInjected = inject(MAT_DIALOG_DATA)
    dialogRef = inject(MatDialogRef<FormTeacher>)
    title = this.dataInjected ? 'Edit Teacher' : 'New Teacher';

    fg: FormGroup

    constructor() {
        this.fg = new FormGroup({
            id: new FormControl(this.dataInjected?.id),
            name: new FormControl(this.dataInjected?.name, Validators.required),
            lastname: new FormControl(this.dataInjected?.lastname, Validators.required),
            email: new FormControl(this.dataInjected?.email, [Validators.required, Validators.email]),
            phone: new FormControl(this.dataInjected?.phone),
            summary: new FormControl(this.dataInjected?.summary),
            linkedin: new FormControl(this.dataInjected?.linkedin),
            photoUrl: new FormControl(this.dataInjected?.photoUrl),
            skills: new FormControl(this.dataInjected?.skills?.join(', ') || '', Validators.required),
        });
    }

    save() {
        if (this.fg.valid) {
            const formData = { ...this.fg.value };
            // Convert skills string to array
            if (formData.skills) {
                formData.skills = formData.skills.split(',').map((skill: string) => skill.trim()).filter((skill: string) => skill);
            } else {
                formData.skills = [];
            }
            this.dialogRef.close(formData);
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}