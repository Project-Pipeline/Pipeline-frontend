import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SignupComponent} from './components/signup/signup.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagingComponent } from './components/central-hub/messaging/messaging.component';
import { SegmentedControlComponent } from './reusable-components/segmented-control/segmented-control.component';
import { MessagingDateFormatterPipe } from './pipes/messaging-date-formatter.pipe';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { OpportunitiesComponent } from './components/opportunities/opportunities.component';
import { NewsCenterComponent } from './components/news-center/news-center.component';
import { CentralHubComponent } from './components/central-hub/central-hub.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        SignupComponent,
        ProfileComponent,
        MessagingComponent,
        SegmentedControlComponent,
        MessagingDateFormatterPipe,
        OpportunitiesComponent,
        NewsCenterComponent,
        CentralHubComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
