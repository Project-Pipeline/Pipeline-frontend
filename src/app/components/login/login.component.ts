import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter} from "rxjs/operators";

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

    businessTypes: string[] = ["organization", "business", "school"]
    industries: string[] = ["Architecture", "Construction", "Business", "Engineering", "Education", "My industry is not listed"]
    selectedBusiness = this.businessTypes[0];
    selectedIndustry = "";
    showExtraIndustry = false;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParams
            .pipe(filter((params) => params.email != null))
            .subscribe((param) => {
                this.email = param.email;
                this.name = param.name;
                this.id = param.id;
                this.picture = param.picture
                this.given_name = param.given_name;
                this.last_name = param.last_name;
                this.pageReady = true;
            });
    }

    checkIndustryNotSelected() {
        this.showExtraIndustry = this.selectedIndustry === "My industry is not listed";
    }

}
