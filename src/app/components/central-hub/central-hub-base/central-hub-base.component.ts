import {AfterViewInit, Component, HostListener, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

//Intended to be subclassed by child components in central hub, in order to obtain the ability to have a static height
@Component({
    selector: 'app-central-hub-base',
    template: '',
})
export class CentralHubBaseComponent implements AfterViewInit, OnDestroy {
    // height
    viewportHeight: number = null;
    viewportHeightString: string = null;
    heightChanged$: Subject<[number, string]> = new Subject();
    // memory mgmt
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor() {
    }

    ngAfterViewInit() {
        this.viewportHeightString = this.getViewportHeight();
        this.heightChanged$.next([this.viewportHeight, this.viewportHeightString]);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.viewportHeightString = this.getViewportHeight();
        this.heightChanged$.next([this.viewportHeight, this.viewportHeightString]);
    }

    getViewportHeight(): string {
        this.viewportHeight = window.innerHeight - 80;
        return `${this.viewportHeight}px`;
    }
}
