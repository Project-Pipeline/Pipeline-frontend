import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewsCenterComponent} from "./news-center.component";

const routes: Routes = [
    {path: '', component: NewsCenterComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsCenterRoutingModule {
}
