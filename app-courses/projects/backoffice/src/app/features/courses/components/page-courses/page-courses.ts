import { Component, computed, inject, signal } from '@angular/core';
import { Layout } from '../../../../core/services/layout';
import { Container } from '../../../../core/components/container/container';
import { Table } from '../../../../core/components/table/table';
import { MetaColums } from '../../../../core/types/metacolum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CourseService } from '../adapters/course.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormCourse } from '../form-course/form-course';
import { UtilService } from '../../../../core/services/util.service';
import { Navigation } from '../../../../core/components/navigation/navigation';
import { Export } from '../../../../core/components/export/export';
import { CourseApplication } from '../application/course.application';

@Component({
  selector: 'cdev-page-courses',
  imports: [Container, Table, MatButtonModule, MatIconModule, MatTableModule, MatDialogModule, Navigation, Export],
  templateUrl: './page-courses.html',
  styleUrl: './page-courses.css',
})
export class PageCourses {
  layout = inject(Layout);
  application = inject(CourseApplication)
  dialog = inject(MatDialog);
  serviceUtil = inject(UtilService);

  currentPage = signal<number>(1);
  hasMore = signal<boolean>(false);

  metaColums: MetaColums = [
    { title: 'ID', field: 'id' },
    { title: 'Título del curso', field: 'title' }
  ]

  response = computed(() => this.application.listCourses())

  allCourses = computed(() => this.application.listAllCourses())

  constructor() {
    this.layout.config = {
      visibilityMenu: true,
      visibilityHeader: true
    }
  }

  changePage(page: number) {
    this.application.currentPage.set(page);
    this.currentPage.set(page);
  }

  openForm(el = null) {
    const ref = this.dialog.open(FormCourse, {
      data: el,
      panelClass: 'container-dialog',
      disableClose: true
    })

    ref.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.application.updateCourse.set({ id: result.id, title: result.title });
          this.serviceUtil.notify("Course updated successfully!");
        } else {
          this.application.createCourse.set({ title: result.title });
          this.serviceUtil.notify("Course created successfully!");
        }
      }
    })
  }

  async remove(el: any) {
    const result = await this.serviceUtil.confirm(`Are you sure you want to remove the course "${el.title}"?`)

    if (result) {
      this.application.deleteCourse.set(el.id);
      this.serviceUtil.notify("Course removed successfully!");
    }
  }
}
