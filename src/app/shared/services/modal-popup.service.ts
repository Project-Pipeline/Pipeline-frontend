import {Injectable, TemplateRef} from '@angular/core';
import {ComponentType} from "@angular/cdk/overlay";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogSize} from "../../models/model classes/DialogSize";
import {Observable} from "rxjs";
import {ModalPopupComponent} from "../components/modal-popup/modal-popup.component";
import {ComponentAndArgument} from "../../models/helpers/modal-popup/ComponentAndArgument";
import {ModalPresentable} from "../../models/helpers/modal-popup/ModalPresentable";
import {SharedModule} from "../shared.module";

@Injectable({
    providedIn: SharedModule
})
export class ModalPopupService {

    constructor(private matDialog: MatDialog) {
    }

    openDialogComponent<T>(
        component: ComponentType<T> | TemplateRef<T>,
        argument: any = null,
        size: DialogSize = DialogSize.large,
        disableClose = true
    ): Observable<any> {
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

    openComponentAsDialog<Comp extends ModalPresentable>(
        component: ComponentType<Comp>,
        size: DialogSize = DialogSize.large,
        argument: any = null,
        disableClose = true
    ): Observable<any> {
        const dialogConfig = new MatDialogConfig();
        // The user can't close the dialog by clicking outside its body
        dialogConfig.disableClose = disableClose;
        dialogConfig.id = 'modal-component';
        dialogConfig.height = size.split(', ')[0];
        dialogConfig.width = size.split(', ')[1];
        dialogConfig.data = new ComponentAndArgument(component, argument);
        const modalDialog = this.matDialog.open(ModalPopupComponent, dialogConfig);
        return modalDialog.afterClosed();
    }
}
