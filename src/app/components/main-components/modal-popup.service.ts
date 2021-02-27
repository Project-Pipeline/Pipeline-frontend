import {Injectable, TemplateRef} from '@angular/core';
import {ComponentType} from "@angular/cdk/overlay";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogSize} from "../../models/model classes/DialogSize";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModalPopupService {

    constructor(private matDialog: MatDialog) {
    }

    openDialogComponent<T>(
        component: ComponentType<T> | TemplateRef<T>,
        argument: any = null,
        size: DialogSize = DialogSize.large,
        disableClose = true): Observable<any> {
        const dialogConfig = new MatDialogConfig();
        // The user can't close the dialog by clicking outside its body
        dialogConfig.disableClose = disableClose;
        dialogConfig.id = 'modal-component';
        dialogConfig.height = size.split(', ')[0];
        dialogConfig.width = size.split(', ')[1];
        dialogConfig.data = argument;
        // https://material.angular.io/components/dialog/overview
        const modalDialog = this.matDialog.open(component, dialogConfig);
        return modalDialog.afterClosed();
    }
}
