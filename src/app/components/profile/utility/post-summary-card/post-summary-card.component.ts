import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../../models/model classes/posts/Post";

@Component({
    selector: 'app-post-summary-card',
    templateUrl: './post-summary-card.component.html',
    styleUrls: ['./post-summary-card.component.scss']
})
export class PostSummaryCardComponent implements OnInit {
    @Input() post: Post;
    @Input() noPost = false;
    @Output() moreButtonEvent: EventEmitter<Post> = new EventEmitter<Post>();

    // i18n pipe
    mapping: {[k: string]: string} = {
        '=1': '1 link',
        'other': '# links',
    };

    constructor() {
    }

    ngOnInit(): void {

    }

    moreButtonClicked() {
        this.moreButtonEvent.emit(this.post);
    }


}
