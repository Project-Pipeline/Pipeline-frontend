import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpportunitiesComponent} from "./opportunities/opportunities.component";
import { CentralHubComponent} from "./central-hub/central-hub.component";
import {MessagingComponent} from "./central-hub/messaging/messaging.component";
import {ProfileComponent} from "./profile/profile.component";
import {NewsCenterComponent} from "./news-center/news-center.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MessagingDateFormatterPipe} from "../../pipes/messaging-date-formatter.pipe";
import { MainComponent } from './main/main.component';
import {SegmentedControlComponent} from "../reusable-components/segmented-control/segmented-control.component";
import {MainComponentsRoutingModule} from "./main-components-routing.module";

@NgModule({
    declarations: [
        OpportunitiesComponent,
        CentralHubComponent,
        MessagingComponent,
        ProfileComponent,
        NewsCenterComponent,
        NavbarComponent,
        MessagingDateFormatterPipe,
        MainComponent,
        SegmentedControlComponent
    ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
        MainComponentsRoutingModule
    ]
})
export class MainComponentsModule {
}
