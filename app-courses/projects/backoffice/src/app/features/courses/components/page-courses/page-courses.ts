import { Component, computed, inject } from '@angular/core';
import { Layout } from '../../../../core/services/layout';
import { Container } from '../../../../core/components/container/container';
import { Table } from '../../../../core/components/table/table';
import { MetaColums } from '../../../../core/types/metacolum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CourseService } from '../../services/course.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormCourse } from '../form-course/form-course';
import { Confirm } from '../../../../core/components/confirm/confirm';
import { UtilService } from '../../../../core/services/util.service';

@Component({
  selector: 'cdev-page-courses',
  imports: [Container, Table, MatButtonModule, MatIconModule, MatTableModule, MatDialogModule],
  templateUrl: './page-courses.html',
  styleUrl: './page-courses.css',
})
export class PageCourses {
  layout = inject(Layout);
  service = inject(CourseService)
  dialog = inject(MatDialog);
  serviceUtil = inject(UtilService);

  metaColums: MetaColums = [
    { title: 'ID', field: 'id' },
    { title: 'Título del curso', field: 'title' }
  ]

  response = computed(() => this.service.listCourses())

  constructor() {
    this.layout.config = {
      visibilityMenu: true,
      visibilityHeader: true
    }
  }

  changePage(page: number) {
    this.service.currentPage.set(page);
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
          this.service.update(result.id, result.title);
        } else {
          this.service.create(result.title);
        }
      }
    })
  }

  async remove(el: any) {
    const result = await this.serviceUtil.confirm(`Are you sure you want to remove the course "${el.title}"?`)

    if (result) {
      this.service.remove(el.id);
    }
  }
}
