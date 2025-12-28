import { Component, computed, inject, signal } from '@angular/core';
import { Layout } from '../../../../core/services/layout';
import { Container } from '../../../../core/components/container/container';
import { Table } from '../../../../core/components/table/table';
import { MetaColums } from '../../../../core/types/metacolum';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TeacherService } from '../../services/teacher.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormTeacher } from '../form-teacher/form-teacher';
import { UtilService } from '../../../../core/services/util.service';
import { Navigation } from '../../../../core/components/navigation/navigation';

@Component({
    selector: 'cdev-page-teachers',
    imports: [Container, Table, MatButtonModule, MatIconModule, MatTableModule, MatDialogModule, Navigation],
    templateUrl: './page-teachers.html',
    styleUrl: './page-teachers.css',
})
export class PageTeachers {
    layout = inject(Layout);
    service = inject(TeacherService)
    dialog = inject(MatDialog);
    serviceUtil = inject(UtilService);

    currentPage = signal<number>(1);
    hasMore = signal<boolean>(false);

    metaColums: MetaColums = [
        { title: 'ID', field: 'id' },
        { title: 'First Name', field: 'name' },
        { title: 'Last Name', field: 'lastname' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone' },
        { title: 'Skills', field: 'skills' }
    ]

    response = computed(() => this.service.listTeachers())

    constructor() {
        this.layout.config = {
            visibilityMenu: true,
            visibilityHeader: true
        }
    }

    changePage(page: number) {
        this.service.currentPage.set(page);
        this.currentPage.set(page);
    }

    openForm(el = null) {
        const ref = this.dialog.open(FormTeacher, {
            data: el,
            panelClass: 'container-dialog',
            disableClose: true,
            width: '600px'
        })

        ref.afterClosed().subscribe(result => {
            if (result) {
                if (result.id) {
                    this.service.updateTeacher.set(result);
                    this.serviceUtil.notify("Teacher updated successfully!");
                } else {
                    const data = Object.assign({}, result);
                    delete data.id;
                    this.service.createTeacher.set(data);
                    this.serviceUtil.notify("Teacher created successfully!");
                }
            }
        })
    }

    async remove(el: any) {
        const result = await this.serviceUtil.confirm(`Are you sure you want to remove the teacher "${el.name} ${el.lastname}"?`)

        if (result) {
            this.service.deleteTeacher.set(el.id);
            this.serviceUtil.notify("Teacher removed successfully!");
        }
    }

    formatSkills(skills: string[] | string): string {
        if (Array.isArray(skills)) {
            return skills.join(', ');
        }
        return skills || '';
    }
}