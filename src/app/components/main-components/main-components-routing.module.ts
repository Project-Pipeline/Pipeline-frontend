import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {OpportunitiesComponent} from "./opportunities/opportunities.component";
import {NewsCenterComponent} from "./news-center/news-center.component";
import {CentralHubComponent} from "./central-hub/central-hub.component";
import {MainComponent} from "./main/main.component";
import {IndividualProfileComponent} from "./profile/individual-profile/individual-profile.component";

const routes: Routes = [
    // main: after logging in
    {
        path: '',
        component: MainComponent,
        children: [
            {path: 'profile', component: ProfileComponent},
            {path: 'opportunities', component: OpportunitiesComponent},
            {path: 'news-center', component: NewsCenterComponent},
            {path: 'central-hub', component: CentralHubComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainComponentsRoutingModule { }
