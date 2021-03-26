import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OpportunitiesComponent} from "./opportunities/opportunities.component";
import {CentralHubComponent} from "./central-hub/central-hub.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
    // main: after logging in
    {
        path: '',
        component: MainComponent,
        children: [
            {path: 'opportunities', component: OpportunitiesComponent},
            {
                path: 'news-center',
                loadChildren: () => {
                    return import('../news-center/news-center.module').then(m => m.NewsCenterModule);
                }
            },
            {path: 'central-hub', component: CentralHubComponent},
            {
                path: 'profile',
                loadChildren: () => {
                    return import('../profile/profile.module').then(m => m.ProfileModule);
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainComponentsRoutingModule { }
