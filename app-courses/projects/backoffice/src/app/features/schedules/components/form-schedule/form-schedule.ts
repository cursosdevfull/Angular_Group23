import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ScheduleService } from '../../services/schedule.service';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
    selector: 'cdev-form-schedule',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogContent,
        MatDialogActions,
        MatToolbarModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    providers: [provideNativeDateAdapter()],
    templateUrl: './form-schedule.html',
    styleUrl: './form-schedule.css',
    encapsulation: ViewEncapsulation.None
})
export class FormSchedule {
    dataInjected = inject(MAT_DIALOG_DATA)
    dialogRef = inject(MatDialogRef<FormSchedule>)
    scheduleService = inject(ScheduleService)
    title = this.dataInjected ? 'Edit Schedule' : 'New Schedule';

    fg: FormGroup

    courses = this.scheduleService.listCourses
    teachers = this.scheduleService.listTeachers

    constructor() {
        this.fg = new FormGroup({
            id: new FormControl(this.dataInjected?.id),
            title: new FormControl(this.dataInjected?.title, Validators.required),
            imageUrl: new FormControl(this.dataInjected?.imageUrl),
            resume: new FormControl(this.dataInjected?.resume),
            goals: new FormControl(this.dataInjected?.goals?.join(', ') || '', Validators.required),
            syllabus: new FormControl(this.dataInjected?.syllabus?.join(', ') || '', Validators.required),
            requirements: new FormControl(this.dataInjected?.requirements?.join(', ') || '', Validators.required),
            frequency: new FormControl(this.dataInjected?.frequency),
            start: new FormControl(this.dataInjected?.start ? new Date(this.dataInjected.start) : null, Validators.required),
            rangeHours: new FormControl(this.dataInjected?.rangeHours),
            slogan: new FormControl(this.dataInjected?.slogan),
            duration: new FormControl(this.dataInjected?.duration),
            courseId: new FormControl(this.dataInjected?.courseId, Validators.required),
            teacherId: new FormControl(this.dataInjected?.teacherId, Validators.required),
        });
    }

    save() {
        if (this.fg.valid) {
            const formData = { ...this.fg.value };

            // Convert arrays from comma-separated strings
            if (formData.goals) {
                formData.goals = formData.goals.split(',').map((item: string) => item.trim()).filter((item: string) => item);
            } else {
                formData.goals = [];
            }

            if (formData.syllabus) {
                formData.syllabus = formData.syllabus.split(',').map((item: string) => item.trim()).filter((item: string) => item);
            } else {
                formData.syllabus = [];
            }

            if (formData.requirements) {
                formData.requirements = formData.requirements.split(',').map((item: string) => item.trim()).filter((item: string) => item);
            } else {
                formData.requirements = [];
            }

            // Convert date to ISO string
            if (formData.start) {
                formData.start = formData.start.toISOString().split('T')[0];
            }

            this.dialogRef.close(formData);
        }
    }

    cancel() {
        this.dialogRef.close();
    }
}