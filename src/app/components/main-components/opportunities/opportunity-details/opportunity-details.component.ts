import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Opportunity} from "../../../../models/model classes/opportunities/Opportunity";
import {unixTimeStampToDate} from "../../../../models/Global";
import {ModalPresentable} from "../../../../models/helpers/modal-popup/ModalPresentable";

@Component({
    selector: 'app-opportunity-details',
    templateUrl: './opportunity-details.component.html',
    styleUrls: ['./opportunity-details.component.scss']
})
export class OpportunityDetailsComponent implements OnInit, ModalPresentable {
    @Input() opportunity: Opportunity = null;
    @Input() width: string;
    @Output() closeButtonClicked = new EventEmitter<any>();
    argument: any;
    onClose: () => void;

    constructor() {
    }

    ngOnInit(): void {
        if (this.argument) {
            this.opportunity = this.argument;
        }
    }

    close() {
        this.closeButtonClicked.emit('');
        if (this.onClose) {
            this.onClose();
        }
    }

    formatDateToNormalDate(number: number): Date {
        return unixTimeStampToDate(number);
    }
}
