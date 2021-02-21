import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Opportunity} from "../../../../models/model classes/opportunities/Opportunity";
import {unixTimeStampToDate} from "../../../../models/Global";

@Component({
    selector: 'app-opportunity-details',
    templateUrl: './opportunity-details.component.html',
    styleUrls: ['./opportunity-details.component.scss']
})
export class OpportunityDetailsComponent implements OnInit {
    @Input() opportunity: Opportunity = null;
    @Input() width: string;
    @Output() closeButtonClicked = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

    close() {
        this.closeButtonClicked.emit('');
    }

    formatDateToNormalDate(number: number): Date {
        return unixTimeStampToDate(number);
    }
}
