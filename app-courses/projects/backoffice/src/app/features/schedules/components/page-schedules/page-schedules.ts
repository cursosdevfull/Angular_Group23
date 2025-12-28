import { Component, computed, inject, signal } from '@angular/core';
import { Layout } from '../../../../core/services/layout';
import { Container } from '../../../../core/components/container/container';
import { Table } from '../../../../core/components/table/table';
import { MetaColums } from '../../../../core/types/metacolum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ScheduleService } from '../../services/schedule.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormSchedule } from '../form-schedule/form-schedule';
import { UtilService } from '../../../../core/services/util.service';
import { Navigation } from '../../../../core/components/navigation/navigation';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'cdev-page-schedules',
  imports: [
    Container,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    Navigation,
    FormsModule,
    Table
  ],
  templateUrl: './page-schedules.html',
  styleUrl: './page-schedules.css',
})
export class PageSchedules {
  layout = inject(Layout);
  service = inject(ScheduleService)
  dialog = inject(MatDialog);
  serviceUtil = inject(UtilService);

  currentPage = signal<number>(1);
  hasMore = signal<boolean>(false);

  courseSelected = ""
  teacherSelected = ""

  metaColums: MetaColums = [
    { title: 'ID', field: 'id' },
    { title: 'Title', field: 'title' },
    { title: 'Course', field: 'course' },
    { title: 'Teacher', field: 'teacher' },
    { title: 'Start Date', field: 'start' },
    { title: 'Frequency', field: 'frequency' },
    { title: 'Duration', field: 'duration' }
  ]

  response = computed(() => this.service.listSchedules())
  courses = computed(() => this.service.listCourses());
  teachers = computed(() => this.service.listTeachers());

  constructor() {
    this.layout.config = {
      visibilityMenu: true,
      visibilityHeader: true
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  formatGoals(goals: string[]): string {
    if (!goals || goals.length === 0) return '';
    return goals.slice(0, 2).join(', ') + (goals.length > 2 ? '...' : '');
  }

  changePage(page: number) {
    this.service.currentPage.set(page);
    this.currentPage.set(page);
  }

  openForm(el = null) {
    const ref = this.dialog.open(FormSchedule, {
      data: el,
      panelClass: 'container-dialog',
      disableClose: true,
      width: '800px',
      maxHeight: '90vh'
    })

    ref.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.service.updateSchedule.set(result);
          this.serviceUtil.notify("Schedule updated successfully!");
        } else {
          this.service.createSchedule.set(result);
          this.serviceUtil.notify("Schedule created successfully!");
        }
      }
    })
  }

  async remove(el: any) {
    const result = await this.serviceUtil.confirm(`Are you sure you want to remove the schedule "${el.title}"?`)

    if (result) {
      this.service.deleteSchedule.set(el.id);
      this.serviceUtil.notify("Schedule removed successfully!");
    }
  }
}