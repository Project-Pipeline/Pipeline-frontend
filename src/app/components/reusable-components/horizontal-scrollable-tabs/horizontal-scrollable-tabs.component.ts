import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-horizontal-scrollable-tabs',
    templateUrl: './horizontal-scrollable-tabs.component.html',
    styleUrls: ['./horizontal-scrollable-tabs.component.scss']
})
export class HorizontalScrollableTabsComponent implements OnInit {
    @Input() tabs: string[] = [];
    @Input() tabMappings: boolean[] = [];
    @Input() boldFont: boolean = true;
    @Output() tabSelected: EventEmitter<[string, number]> = new EventEmitter();
    private previousIndex: number = null;

    constructor() {
    }

    ngOnInit(): void {
        this.tabMappings.forEach((val, index) => {
            if (val) {
                this.tabSelected.emit([this.tabs[index], index]);
            }
        });
    }

    selectTabAt(index: number) {
        this.tabMappings.forEach((tab, i) => {
            this.tabMappings[i] = index === i;
        });
        if (index !== this.previousIndex) {
            this.tabSelected.emit([this.tabs[index], index]);
        }
        this.previousIndex = index;

    }

}
