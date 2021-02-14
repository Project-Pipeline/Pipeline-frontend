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
import { IndividualProfileComponent } from './profile/individual-profile/individual-profile.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ModalPopupService} from "./modal-popup.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { IndividualUserDetailsPopupComponent } from './profile/individual-user-details-popup/individual-user-details-popup.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import { TextPairEditorComponent } from './helpers/text-pair-editor/text-pair-editor.component';
import { EntityProfileComponent } from './profile/entity-profile/entity-profile.component';
import { EntityUserDetailsPopupComponent } from './profile/entity-user-details-popup/entity-user-details-popup.component';
import { AddressAutoCompleterComponent } from './helpers/address-auto-completer/address-auto-completer.component';
import { AddOpportunityPopupComponent } from './opportunities/add-opportunity-popup/add-opportunity-popup.component';
import { RowTextEditorComponent } from './helpers/row-text-editor/row-text-editor.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

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
        SegmentedControlComponent,
        IndividualProfileComponent,
        IndividualUserDetailsPopupComponent,
        TextPairEditorComponent,
        EntityProfileComponent,
        EntityUserDetailsPopupComponent,
        AddressAutoCompleterComponent,
        AddOpportunityPopupComponent,
        RowTextEditorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MainComponentsRoutingModule,
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
        MatCheckboxModule
    ],
    providers: [
        {
            provide: MatDialogRef,
            useValue: {}
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        },
        ModalPopupService
    ]
})
export class MainComponentsModule {
}
