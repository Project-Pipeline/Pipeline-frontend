import {Component, Input, OnInit} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
    @Input() highlightTab: number;
    highlights = [false, false, false, false];

    constructor(
        private userApiService: UserApiService,
        private router: Router)
    {
    }


    ngOnInit(): void {
        this.highlights[this.highlightTab] = true;
    }

    highlightAt(index: number) {
        for (let i = 0; i < this.highlights.length; i ++) {
            this.highlights[i] = index === i;
        }
    }

}
