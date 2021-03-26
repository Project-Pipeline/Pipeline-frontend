import {Component, HostListener, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-central-hub',
    templateUrl: './central-hub.component.html',
    styleUrls: ['./central-hub.component.scss']
})
export class CentralHubComponent implements OnInit {
    viewportHeight: number = null;
    viewportHeightString: string = null;
    showMessages = false;

    constructor(private title: Title) {
        this.viewportHeightString = this.getViewportHeight();
        this.title.setTitle('Central Hub');
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
