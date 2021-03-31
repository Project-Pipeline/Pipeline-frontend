import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CentralHubComponent} from './central-hub.component';
import {MessagingComponent} from './messaging/messaging.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {ResumeBuilderComponent} from './resume-builder/resume-builder.component';
import {ApplicationsComponent} from './applications/applications.component';

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
            {
                path: 'notifications',
                component: NotificationsComponent
            },
            {
                path: 'resumebuilder',
                component: ResumeBuilderComponent
            },
            {
                path: 'applications',
                component: ApplicationsComponent
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralHubRoutingModule { }
