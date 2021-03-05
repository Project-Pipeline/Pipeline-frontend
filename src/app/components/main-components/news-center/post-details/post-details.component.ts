import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../../models/model classes/posts/Post";
import {User} from "../../../../models/model classes/user/User";
import {postCategoryLookUp} from "../../../../models/BusinessConstants";

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
    @Input() post: Post;
    @Input() user: User = null;

    constructor() {
    }

    ngOnInit(): void {
    }

    transformOptionalDate(date?: Date): Date {
        return new Date(date) ?? new Date();
    }

    getUserTypeString(user: User): string {
        return postCategoryLookUp[user.type];
    }

}
