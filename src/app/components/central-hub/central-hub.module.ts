import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CentralHubRoutingModule} from './central-hub-routing.module';
import {CentralHubComponent} from "./central-hub.component";
import {MessagingComponent} from "./messaging/messaging.component";
import {FormsModule} from "@angular/forms";
import {MainComponentsModule} from "../main-components/main-components.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
    declarations: [
        CentralHubComponent,
        MessagingComponent
    ],
    imports: [
        CommonModule,
        CentralHubRoutingModule,
        FormsModule,
        MainComponentsModule,
        SharedModule,
    ]
})
export class CentralHubModule {
}
