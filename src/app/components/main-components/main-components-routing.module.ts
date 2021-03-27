import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";

const routes: Routes = [
    // main: after logging in
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'opportunities',
                loadChildren: () => {
                    return import('../opportunities/opportunities.module').then(m => m.OpportunitiesModule);
                }},
            {
                path: 'news-center',
                loadChildren: () => {
                    return import('../news-center/news-center.module').then(m => m.NewsCenterModule);
                }
            },
            {
                path: 'central-hub',
                loadChildren: () => {
                    return import('../central-hub/central-hub.module').then(m => m.CentralHubModule);
                }
            },
            {
                path: 'profile',
                loadChildren: () => {
                    return import('../profile/profile.module').then(m => m.ProfileModule);
                }
            },
            {
                path: '',
                redirectTo: 'profile'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainComponentsRoutingModule { }
