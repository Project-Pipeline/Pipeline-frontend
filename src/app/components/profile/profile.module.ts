import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {EntityUserDetailsPopupComponent} from "./entity-user-details-popup/entity-user-details-popup.component";
import {IndividualUserDetailsPopupComponent} from "./individual-user-details-popup/individual-user-details-popup.component";
import {ProfileAboutComponent} from "./profile-about/profile-about.component";
import {ProfileOpportunitiesComponent} from "./profile-opportunities/profile-opportunities.component";
import {ProfilePostsComponent} from "./profile-posts/profile-posts.component";
import {PostSummaryCardComponent} from "./utility/post-summary-card/post-summary-card.component";
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
import {FormsModule} from "@angular/forms";
import {ProfileComponent} from "./profile.component";
import {AddOpportunityPopupComponent} from "./add-opportunity-popup/add-opportunity-popup.component";


@NgModule({
    declarations: [
        EntityUserDetailsPopupComponent,
        IndividualUserDetailsPopupComponent,
        ProfileAboutComponent,
        ProfileOpportunitiesComponent,
        ProfilePostsComponent,
        PostSummaryCardComponent,
        ProfileComponent,
        AddOpportunityPopupComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
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
export class ProfileModule {
}
