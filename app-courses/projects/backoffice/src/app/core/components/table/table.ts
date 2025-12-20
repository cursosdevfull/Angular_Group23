import { Component, computed, contentChildren, effect, input, linkedSignal, viewChild } from '@angular/core';
import { MatColumnDef, MatTable, MatTableModule } from '@angular/material/table';
import { MetaColums } from '../../types/metacolum';

@Component({
  selector: 'cdev-table',
  imports: [MatTableModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  metaColumns = input.required<MetaColums>();
  dataSource = input<any>();

  displayedColumns = linkedSignal(() => this.metaColumns().map(col => col.field));

  columnsDef = contentChildren<MatColumnDef>(MatColumnDef);
  table = viewChild.required<MatTable<any>>(MatTable)

  constructor() {
    effect(() => {
      const cols = this.columnsDef();

      if (cols) {
        for (const col of cols) {
          if (!this.displayedColumns().includes(col.name)) {
            this.table().addColumnDef(col);
            this.displayedColumns.update(columns => [...columns, col.name])
          }
        }
      }
    })
  }
}
