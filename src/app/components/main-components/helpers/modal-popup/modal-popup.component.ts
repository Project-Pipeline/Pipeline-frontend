import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    Inject,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import {ComponentAndArgument} from "../../../../models/modal-popup/ComponentAndArgument";
import {ModalPresentable} from "../../../../models/modal-popup/ModalPresentable";

@Component({
    selector: 'app-modal-popup',
    template: `
        <ng-template #baseComponent></ng-template>
    `,
    styleUrls: []
})
export class ModalPopupComponent<Comp extends ComponentType<any> & ModalPresentable, Arg> implements AfterViewInit {
    @ViewChild('baseComponent', {read: ViewContainerRef}) baseComponent: ViewContainerRef;

    constructor(private dialog: MatDialogRef<ModalPopupComponent<Comp, Arg>>,
                private cfr: ComponentFactoryResolver,
                @Inject(MAT_DIALOG_DATA) private componentAndArg: ComponentAndArgument<Comp, Arg>) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            const componentFactory = this.cfr.resolveComponentFactory(this.componentAndArg.component);
            this.baseComponent.clear();
            const modal = <ModalPresentable>this.baseComponent.createComponent(componentFactory).instance;
            modal.argument = this.componentAndArg.argument;
            modal.onClose = () => this.dialog.close();
        }, 0);
    }
}
