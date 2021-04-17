import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {LandingPageData, mockLandingPageData} from "../../models/model classes/onboarding/LandingPageData";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    animations: [
        trigger('navbarHeightExpand', [
            state('shrinked', style({
                height: '70px',
            })),
            state('expanded', style({
                height: '100px',
            })),
            transition('shrinked => expanded', [
                animate('0.3s ease-in-out')
            ]),
            transition('expanded => shrinked', [
                animate('0.3s ease-in-out')
            ])
        ])
    ]
})
export class LandingPageComponent implements OnInit {
    landingPageData: LandingPageData = mockLandingPageData;
    shouldChangeNavbar = false;
    wheelUrl = 'https://res.cloudinary.com/dd8cb6u97/image/upload/v1618451729/project-pipeline-public/ppl-wheel_xb6w6y.svg';

    constructor(title: Title) {
        title.setTitle('Project Pipeline');
    }

    ngOnInit(): void {
    }

    @HostListener('window:scroll', ['$event'])
    handleScroll(){
        const windowScroll = window.pageYOffset;
        this.shouldChangeNavbar = windowScroll >= 20;
    }
}
