import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NewsCenterRoutingModule} from './news-center-routing.module';
import {NewsCenterComponent} from "./news-center.component";
import {FormsModule} from "@angular/forms";
import {MainComponentsModule} from "../main-components/main-components.module";
import {SharedModule} from "../../shared/shared.module";
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
        // Misc
        NgxSpinnerModule
    ]
})
export class NewsCenterModule {
}
