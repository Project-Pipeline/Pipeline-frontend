import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewsCenterRoutingModule} from './news-center-routing.module';
import {NewsCenterComponent} from "./news-center.component";
import {FormsModule} from "@angular/forms";
import {MainComponentsModule} from "../main-components/main-components.module";
import {SharedModule} from "../../shared/shared.module";
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
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgxSpinnerModule} from "ngx-spinner";


@NgModule({
    declarations: [
        NewsCenterComponent
    ],
    imports: [
        CommonModule,
        NewsCenterRoutingModule,

        FormsModule,
        MainComponentsModule,
        SharedModule,
        // Angular material imports
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
        MatTooltipModule,
        MatGridListModule,
        // Misc
        NgxSpinnerModule
    ]
})
export class NewsCenterModule {
}
