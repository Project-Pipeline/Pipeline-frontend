import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/model classes/user/User";
import {UserApiService} from "../../services/user-api.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
    @Input() highlightProfile = false;
    @Input() highlightOpportunities = false;
    @Input() highlightNewsCenter = false;
    @Input() highlightCentralHub = false;

    constructor(
        private userApiService: UserApiService,
        private router: Router)
    {
    }


    ngOnInit(): void {

    }

}
