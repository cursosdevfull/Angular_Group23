import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UtilService } from '../../services/util.service';
import { MetaColums } from '../../types/metacolum';

@Component({
  selector: 'cdev-export',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './export.html',
  styleUrl: './export.css',
})
export class Export {
  utils = inject(UtilService);

  data = input.required<any[]>()
  metadata = input.required<MetaColums>()

  export() {
    this.utils.export(this.data(), this.metadata(), 'exported-data');
  }
}
