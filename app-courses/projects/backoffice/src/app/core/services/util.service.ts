import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";
import { Confirm } from "../components/confirm/confirm";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as XLSX from 'xlsx';
import { MetaColums } from "../types/metacolum";

@Injectable({ providedIn: 'root' })
export class UtilService {
    private dialog = inject(MatDialog);
    private notification = inject(MatSnackBar)

    confirm(message: string): Promise<boolean> {
        const ref = this.dialog.open(Confirm);
        ref.componentInstance.message = message;

        return firstValueFrom(ref.afterClosed());
    }

    notify(message: string, duration: number = 2000) {
        this.notification.open(message, "", {
            duration,
            verticalPosition: 'top'
        })
    }

    export(data: any[], metadata: MetaColums, filename: string) {
        const transformedData = data.map(item => {
            const props = Object.keys(item);
            const transformedItem: any = {}

            props.forEach(prop => {
                const meta = metadata.find(m => m.field === prop);
                if (meta) {
                    transformedItem[meta.title] = item[prop];
                }
            })
            return transformedItem;
        })


        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    }
}