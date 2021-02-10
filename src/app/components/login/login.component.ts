import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {filter, mergeMap, share} from "rxjs/operators";
import {User} from "../../models/model classes/user/User";
import {UserApiService} from "../../services/user-api.service";
import {LoginViewModel} from "./LoginViewModel";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    email: string;
    name: string;
    id: string;
    picture: string;
    given_name: string;
    last_name: string;
    pageReady = false;
    profitType = ['for-profit', 'non-profit'];
    selectedProfitType = '';
    selectedBusiness: string;
    selectedAccountType: string;
    selectedIndustry = "";
    businessName = '';
    showExtraIndustry = false;

    viewModel: LoginViewModel;

    constructor(
        private route: ActivatedRoute,
        private apiService: UserApiService,
        private router: Router) {
        this.viewModel = new LoginViewModel();
        this.selectedBusiness = this.viewModel.businessTypes[0];
    }

    ngOnInit(): void {
        let exists = this.route.queryParams
            .pipe(filter((params) => params.email != null))
            .pipe(mergeMap((param) => {
                this.email = param.email;
                this.name = param.name;
                this.id = param.id;
                this.picture = param.picture;
                this.given_name = param.given_name;
                this.last_name = param.family_name;
                this.apiService.setToken(param.idToken);
                return this.apiService.userExists(this.email);
            }))
            .pipe(share());

        exists
            .pipe(filter((exists) => exists))
            .subscribe((res) => {
                this.router.navigateByUrl('main');
            });

        exists
            .pipe(filter((exists) => !exists))
            .subscribe(() => this.pageReady = true);
    }

    checkIndustryNotSelected() {
        this.showExtraIndustry = this.selectedIndustry === "My industry is not listed";
    }

    continueButtonClicked() {
        let user = new User(
            this.email, this.given_name, this.last_name, this.picture, this.businessName,
            this.selectedBusiness, this.selectedProfitType, this.selectedIndustry,
            this.viewModel.getAccountType(this.selectedAccountType), []);

        this.apiService
            .createUserWith(user)
            .subscribe((res) => {
                this.router.navigateByUrl('main');
            });
    }

}
