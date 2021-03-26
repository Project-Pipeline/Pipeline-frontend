import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HorizontalScrollableTabsComponent} from "./ui-components/horizontal-scrollable-tabs/horizontal-scrollable-tabs.component";
import {PaginatorComponent} from "./ui-components/paginator/paginator.component";
import {SegmentedControlComponent} from "./ui-components/segmented-control/segmented-control.component";
import {TextPairEditorComponent} from "./ui-components/text-pair-editor/text-pair-editor.component";
import {RowTextEditorComponent} from "./ui-components/row-text-editor/row-text-editor.component";
import {ModalPopupComponent} from "./ui-components/modal-popup/modal-popup.component";
import {FormsModule} from "@angular/forms";
import {AddressAutoCompleterComponent} from "./ui-components/address-auto-completer/address-auto-completer.component";

@NgModule({
    declarations: [
        // minor-UI
        HorizontalScrollableTabsComponent,
        PaginatorComponent,
        SegmentedControlComponent,
        TextPairEditorComponent,
        RowTextEditorComponent,
        ModalPopupComponent,
        AddressAutoCompleterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        // angular material
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
    ],
    exports: [
        // minor-UI
        HorizontalScrollableTabsComponent,
        PaginatorComponent,
        SegmentedControlComponent,
        TextPairEditorComponent,
        RowTextEditorComponent,
        ModalPopupComponent,
        AddressAutoCompleterComponent
    ]
})
export class SharedModule {
}
