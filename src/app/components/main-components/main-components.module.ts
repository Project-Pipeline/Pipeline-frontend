import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {MainComponent} from './main/main.component';
import {MainComponentsRoutingModule} from "./main-components-routing.module";
import {OpportunityDetailsComponent} from './opportunities/opportunity-details/opportunity-details.component';
import {AddPostPopupComponent} from './news-center/add-post-popup/add-post-popup.component';
import {PostDetailsComponent} from './news-center/post-details/post-details.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [
        NavbarComponent,
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
        MatToolbarModule
    ],
    exports: [
        OpportunityDetailsComponent,
        AddPostPopupComponent,
        PostDetailsComponent,
    ]
})
export class MainComponentsModule {
}
