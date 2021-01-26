import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-segmented-control',
    templateUrl: './segmented-control.component.html',
    styleUrls: ['./segmented-control.component.scss']
})
export class SegmentedControlComponent implements OnInit {
    @Input() options: string[] = [];
    @Output() optionSelected = new EventEmitter<string>();
    checkedStatuses: boolean[] = [];

    constructor() {
    }

    ngOnInit(): void {
        var flag = false;
        for (var option in this.options) {
            if (!flag) {
                flag = true;
                this.checkedStatuses.push(true);
            } else {
                this.checkedStatuses.push(false);
            }

        }
    }

    selected(event: any, index: number) {
        this.checkedStatuses[index] = true;
        for (let i = 0; i < this.checkedStatuses.length; i++) {
            if (i !== index) {
                this.checkedStatuses[i] = false;
            }
        }
        this.optionSelected.emit(this.options[index]);
    }

    beginningCorner(index: number): boolean {
        return index === 0;
    }

    regularCorner(index: number): boolean {
        return !this.beginningCorner(index) && !this.endingCorner(index);
    }

    endingCorner(index: number): boolean {
        return index === this.checkedStatuses.length - 1;
    }

    widthPercent(): string {
        return `${100/this.options.length - 0.5}%`;
    }

}
