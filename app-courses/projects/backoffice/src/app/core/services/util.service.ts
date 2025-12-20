import { inject, Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom } from "rxjs";
import { Confirm } from "../components/confirm/confirm";

@Injectable({ providedIn: 'root' })
export class UtilService {
    dialog = inject(MatDialog);

    confirm(message: string): Promise<boolean> {
        const ref = this.dialog.open(Confirm);
        ref.componentInstance.message = message;

        return firstValueFrom(ref.afterClosed());
    }
}