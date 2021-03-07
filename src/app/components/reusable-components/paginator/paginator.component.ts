import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
    @Input() page = 0;
    @Input() per = 0;
    @Input() total = 0;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter();
    firstBtnDisabled = false;
    prevBtnDisabled = false;
    nextBtnDisabled = false;
    lastBtnDisabled = false;

    constructor() {
    }

    ngOnInit(): void {
        // vapor pages start at 1 -> thus reducing to 0 for ease of display
        this.page -= 1;
        this.checkDisablingPrevBtn();
        this.checkDisablingNextBtn();
        // console.log(this.total, this.per, this.totalPages);
    }

    itemsStart(): number {
        const start = this.page * this.per + 1;
        if (start < 0) {
            return 0;
        }
        return start;
    }

    itemsEnd(): number {
        const end = (this.page + 1) * this.per;
        if (end > this.total) {
            return this.total;
        }
        return end;
    }

    gotoNextPage() {
        this.page += 1;
        this.checkDisablingPrevBtn();
        this.checkDisablingNextBtn();
        this.pageChanged.emit(this.page + 1);
    }

    gotoPrevPage() {
        this.page -= 1;
        this.checkDisablingPrevBtn();
        this.checkDisablingNextBtn();
        this.pageChanged.emit(this.page + 1);
    }

    private checkDisablingPrevBtn() {
        this.prevBtnDisabled = this.page === 0;
    }

    private checkDisablingNextBtn() {
        const totalPages = Math.ceil(this.total / this.per);
        this.nextBtnDisabled = this.page === totalPages - 1;
    }

    checkButtonStates(resetPage: boolean) {
        if (resetPage) {
            this.page = 0;
        }
        this.checkDisablingNextBtn();
        this.checkDisablingPrevBtn();
    }

}
