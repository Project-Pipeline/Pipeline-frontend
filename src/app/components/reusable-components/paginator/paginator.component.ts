import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
// Notes on usage:
// 1. Inputs page, per and total are only supposed to be set ONCE when the page metadata is first fetched. Setting them
//  manually after first set might cause bugs
// 2. Later page changes in the paginator are delivered via the pageChanged output event - ideally you would next the
// value into an rxjs subject to get the data on the next page
export class PaginatorComponent implements OnInit, OnChanges {
    @Input() page = 0;
    @Input() per = 0;
    @Input() total = 0;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter();
    firstBtnDisabled = false;
    prevBtnDisabled = false;
    nextBtnDisabled = false;
    lastBtnDisabled = false;
    private changeCount = 0;

    constructor() {
    }

    ngOnInit(): void {
        // vapor pages start at 1 -> thus reducing to 0 for ease of display
        this.page -= 1;
        this.checkDisablingPrevBtn();
        this.checkDisablingNextBtn();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.changeCount += 1;
        // first change - when inputs are initially bound on init
        // second change - when the inputs are first set by a consumer - need to check btn states
        if (this.changeCount === 2) {
            this.checkButtonStates(false);
        }

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
