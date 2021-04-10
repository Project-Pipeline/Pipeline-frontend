import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CentralHubRoutingModule} from './central-hub-routing.module';
import {CentralHubComponent} from "./central-hub.component";
import {MessagingComponent} from "./messaging/messaging.component";
import {FormsModule} from "@angular/forms";
import {MainComponentsModule} from "../main-components/main-components.module";
import {SharedModule} from "../../shared/shared.module";
import { CentralHubBaseComponent } from './central-hub-base/central-hub-base.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ResumeBuilderComponent } from './resume-builder/resume-builder.component';
import { ApplicationsComponent } from './applications/applications.component';
import { ResumeBuilderEducationComponent } from './resume-builder/sections/resume-builder-education/resume-builder-education.component';
import { ResumeBuilderHeaderComponent } from './resume-builder/sections/resume-builder-header/resume-builder-header.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxSpinnerModule} from "ngx-spinner";
import { ResumeBuilderActivitiesComponent } from './resume-builder/sections/resume-builder-activities/resume-builder-activities.component';


@NgModule({
    declarations: [
        CentralHubComponent,
        MessagingComponent,
        CentralHubBaseComponent,
        NotificationsComponent,
        ResumeBuilderComponent,
        ApplicationsComponent,
        ResumeBuilderEducationComponent,
        ResumeBuilderHeaderComponent,
        ResumeBuilderActivitiesComponent
    ],
    imports: [
        CommonModule,
        CentralHubRoutingModule,
        FormsModule,
        MainComponentsModule,
        SharedModule,
        // Angular material
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        // misc
        NgxSpinnerModule
    ]
})
export class CentralHubModule {
}
