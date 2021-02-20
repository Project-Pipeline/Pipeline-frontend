import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {last} from "rxjs/operators";

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
    highlightIndex = 3;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        const segments = window.location.href.split('/');
        const lastIndex = segments.length - 1;
        const lastComponent = segments[lastIndex];
        if (this.tabs.includes(lastComponent)) {
            const mainIndex = segments.indexOf('main')
            if (lastIndex - 1 === mainIndex) {
                this.highlightIndex = this.tabs.indexOf(lastComponent);
            }
        } else if (lastComponent === 'main') {
            this.highlightIndex = 0;
            this.router.navigateByUrl('main/profile');
        }
    }

}
