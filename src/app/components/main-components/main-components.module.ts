import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GoogleMapsModule} from "@angular/google-maps";
import {OpportunityDetailsComponent} from './opportunities/opportunity-details/opportunity-details.component';
import {AddPostPopupComponent} from './news-center/add-post-popup/add-post-popup.component';
import {PostDetailsComponent} from './news-center/post-details/post-details.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatGridListModule} from "@angular/material/grid-list";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        NavbarComponent,
        MessagingDateFormatterPipe,
        MainComponent,
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
        PostDetailsComponent,
        MessagingDateFormatterPipe
    ]
})
export class MainComponentsModule {
}
