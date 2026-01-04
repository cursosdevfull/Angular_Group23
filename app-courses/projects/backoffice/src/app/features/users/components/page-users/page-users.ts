import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Container } from '../../../../core/components/container/container';
import { Navigation } from '../../../../core/components/navigation/navigation';
import { Table } from '../../../../core/components/table/table';
import { UserService } from '../../services/user.service';
import { Layout } from '../../../../core/services/layout';
import { UtilService } from '../../../../core/services/util.service';
import { MetaColums } from '../../../../core/types/metacolum';
import { FormUser } from '../form-user/form-user';

@Component({
  selector: 'cdev-page-users',
  imports: [Container,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    Navigation,
    FormsModule,
    Table],
  templateUrl: './page-users.html',
  styleUrl: './page-users.css',
})
export class PageUsers {
  layout = inject(Layout);
  service = inject(UserService)
  dialog = inject(MatDialog);
  serviceUtil = inject(UtilService);

  currentPage = signal<number>(1);
  hasMore = signal<boolean>(false);

  metaColums: MetaColums = [
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' }
  ]

  response = computed(() => this.service.listUsers())

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
    const ref = this.dialog.open(FormUser, {
      data: el,
      panelClass: 'container-dialog',
      disableClose: true
    })

    ref.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.service.updateUser.set(result);
          this.serviceUtil.notify("User updated successfully!");
        } else {
          const data = Object.assign({}, result);
          delete data.id;
          this.service.createUser.set(data);
          this.serviceUtil.notify("User created successfully!");
        }
      }
    })
  }

  async remove(el: any) {
    const result = await this.serviceUtil.confirm(`Are you sure you want to remove the user "${el.name}"?`)

    if (result) {
      this.service.deleteUser.set(el.id);
      this.serviceUtil.notify("User removed successfully!");
    }
  }

  joinRoles(roles: any[]): string {
    if (!roles || roles.length === 0) return '';
    return roles.map(r => r.name).join(', ');
  }
}
