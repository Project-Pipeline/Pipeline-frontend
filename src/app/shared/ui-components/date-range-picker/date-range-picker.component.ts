import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {DateRangePickable} from "./DateRangePickable";

@Component({
    selector: 'app-date-range-picker',
    templateUrl: './date-range-picker.component.html'
})
export class DateRangePickerComponent implements AfterViewInit {
    @Input() pickable: DateRangePickable;
    @Input() startDateTitle = 'Start Date';
    @Input() endDateTitle = 'End Date';
    @Input() currentCheckboxText: string;
    @ViewChild('checkbox') private checkbox: MatCheckbox;

    constructor() {
    }

    ngAfterViewInit() {
        this.checkbox.checked = this.pickable.current;
    }

    currentCheckBoxChecked(event: MatCheckboxChange) {
        this.pickable.current = event.checked;
        if (event.checked) {
            this.pickable.endDate = null;
        }
    }
}
