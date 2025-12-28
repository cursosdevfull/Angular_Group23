import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";
import { Confirm } from "../components/confirm/confirm";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: 'root' })
export class UtilService {
    dialog = inject(MatDialog);
    notification = inject(MatSnackBar)

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
}