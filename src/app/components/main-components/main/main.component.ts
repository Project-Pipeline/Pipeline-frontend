import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {urlComponentAfter} from "../../../models/Global";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private tabs = [
        "profile",
        "central-hub",
        "news-center",
        "opportunities"
    ];
    highlightIndex = 0;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        const componentAfterMain = urlComponentAfter('main');
        if (componentAfterMain) {
            if (this.tabs.includes(componentAfterMain)) {
                this.highlightIndex = this.tabs.indexOf(componentAfterMain);
            }
        } else { // on main comp
            this.highlightIndex = 0;
            this.router.navigateByUrl('main/profile');
        }
    }
}
