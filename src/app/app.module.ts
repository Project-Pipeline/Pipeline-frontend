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
import { MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        NavbarComponent,
        SignupComponent,
        ProfileComponent

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
