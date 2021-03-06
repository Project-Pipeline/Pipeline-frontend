import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter} from "rxjs/operators";
import {ConfigService} from "../../services/config.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    errorMessage = "";

    constructor(
        private routes: ActivatedRoute,
        public config: ConfigService,
        private title: Title) {
        this.title.setTitle('Project Pipeline');
    }

    ngOnInit(): void {
        this.routes.queryParams
            .pipe(filter((param) => param.errorMessage != null))
            .subscribe((param) => this.errorMessage = param.errorMessage);
    }

}
