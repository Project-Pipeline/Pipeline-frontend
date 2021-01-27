import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";

const routes: Routes = [
    // login
    {path: '', component: SignupComponent},
    {path: 'login', component: SignupComponent},
    {path: 'logindetails', component: LoginComponent},
    {
        // lazy loading
        path: 'main',
        loadChildren: () => {
            return import('./components/main-components/main-components.module')
                .then(m => m.MainComponentsModule);
        }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
