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
import {HorizontalScrollableTabsComponent} from "./horizontal-scrollable-tabs/horizontal-scrollable-tabs.component";
import {PaginatorComponent} from "./paginator/paginator.component";
import {SegmentedControlComponent} from "./segmented-control/segmented-control.component";

@NgModule({
    declarations: [
        HorizontalScrollableTabsComponent,
        PaginatorComponent,
        SegmentedControlComponent
    ],
    imports: [
        CommonModule,
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
        HorizontalScrollableTabsComponent,
        PaginatorComponent,
        SegmentedControlComponent
    ]
})
export class SharedModule {
}
