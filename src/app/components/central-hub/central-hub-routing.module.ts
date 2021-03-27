import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CentralHubComponent} from "./central-hub.component";
import {MessagingComponent} from "./messaging/messaging.component";

const routes: Routes = [
    {
        path: '',
        component: CentralHubComponent,
        children: [
            {
                path: 'messaging',
                component: MessagingComponent
            },
            {
                path: '',
                redirectTo: 'messaging'
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralHubRoutingModule { }
