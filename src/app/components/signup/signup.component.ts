import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {filter} from "rxjs/operators";
import {ConfigService} from "../../services/config.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    errorMessage = "";

    constructor(private routes: ActivatedRoute, public config: ConfigService) {
    }

    ngOnInit(): void {
        this.routes.queryParams
            .pipe(filter((param) => param.errorMessage != null))
            .subscribe((param) => this.errorMessage = param.errorMessage);
    }

}
