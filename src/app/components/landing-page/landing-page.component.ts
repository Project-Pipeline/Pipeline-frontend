import {Component, HostListener, OnInit} from '@angular/core';
import {LandingPageData, mockLandingPageData} from "../../models/model classes/onboarding/LandingPageData";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
    landingPageData: LandingPageData = mockLandingPageData;
    shouldChangeNavbar = false;

    constructor() {
    }

    ngOnInit(): void {
    }
}
