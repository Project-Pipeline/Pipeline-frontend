import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {OpportunitiesComponent} from "./components/opportunities/opportunities.component";
import {NewsCenterComponent} from "./components/news-center/news-center.component";

const routes: Routes = [
    // login
    {path: 'login', component: SignupComponent},
    {path: 'logindetails', component: LoginComponent},
    // main: after logging in
    {path: 'profile', component: ProfileComponent},
    {path: '', component: ProfileComponent},
    {path: 'opportunities', component: OpportunitiesComponent},
    {path: 'news-center', component: NewsCenterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
