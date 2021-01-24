import {Component, HostListener, OnInit} from '@angular/core';

@Component({
    selector: 'app-central-hub',
    templateUrl: './central-hub.component.html',
    styleUrls: ['./central-hub.component.scss']
})
export class CentralHubComponent implements OnInit {
    viewportHeight: number = null;
    viewportHeightString: string = null;
    showMessages = false;

    constructor() {
        this.viewportHeightString = this.getViewportHeight();
    }

    ngOnInit(): void {
        this.showMessages = true;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.viewportHeightString = this.getViewportHeight();
    }

    getViewportHeight(): string {
       this.viewportHeight = window.innerHeight - 80;
       return `${this.viewportHeight}px`;
    }

    showMessage() {
        this.showMessages = true;
    }

}
