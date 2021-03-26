import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpportunitiesRoutingModule} from './opportunities-routing.module';
import {OpportunitiesComponent} from "./opportunities.component";
import {OpportunitiesFilterBarComponent} from "./opportunities-filter-bar/opportunities-filter-bar.component";
import {FormsModule} from "@angular/forms";
import {MainComponentsModule} from "../main-components/main-components.module";
import {SharedModule} from "../../shared/shared.module";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
    declarations: [
        OpportunitiesComponent,
        OpportunitiesFilterBarComponent
    ],
    imports: [
        CommonModule,
        OpportunitiesRoutingModule,
        FormsModule,
        MainComponentsModule,
        SharedModule,
        // google maps
        GoogleMapsModule,
        // angular material
        MatCheckboxModule
    ]
})
export class OpportunitiesModule {
}
