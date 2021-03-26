import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CentralHubComponent} from "./central-hub.component";

const routes: Routes = [
    {path: '', component: CentralHubComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralHubRoutingModule { }
