import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OpportunitiesComponent} from "./opportunities/opportunities.component";
import {CentralHubComponent} from "./central-hub/central-hub.component";
import {MessagingComponent} from "./central-hub/messaging/messaging.component";
import {ProfileComponent} from "../profile/profile.component";
import {NewsCenterComponent} from "../news-center/news-center.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MessagingDateFormatterPipe} from "../../pipes/messaging-date-formatter.pipe";
import {MainComponent} from './main/main.component';
import {MainComponentsRoutingModule} from "./main-components-routing.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {AddOpportunityPopupComponent} from './opportunities/add-opportunity-popup/add-opportunity-popup.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GoogleMapsModule} from "@angular/google-maps";
import {OpportunitiesFilterBarComponent} from './opportunities/opportunities-filter-bar/opportunities-filter-bar.component';
import {OpportunityDetailsComponent} from './opportunities/opportunity-details/opportunity-details.component';
import {AddPostPopupComponent} from './news-center/add-post-popup/add-post-popup.component';
import {PostDetailsComponent} from './news-center/post-details/post-details.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatGridListModule} from "@angular/material/grid-list";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        OpportunitiesComponent,
        CentralHubComponent,
        MessagingComponent,
        NavbarComponent,
        MessagingDateFormatterPipe,
        MainComponent,
        AddOpportunityPopupComponent,
        OpportunitiesFilterBarComponent,
        OpportunityDetailsComponent,
        AddPostPopupComponent,
        PostDetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
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
        MatCheckboxModule,
        MatTooltipModule,
        MatGridListModule,
        // Google maps,
        GoogleMapsModule,
        // Misc
        NgxSpinnerModule
    ],
    exports: [
        OpportunityDetailsComponent,
        AddPostPopupComponent,
        PostDetailsComponent
    ]
})
export class MainComponentsModule {
}
