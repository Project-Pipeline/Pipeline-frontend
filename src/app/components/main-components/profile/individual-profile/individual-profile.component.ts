import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../../../services/user-api.service";
import {Router} from "@angular/router";
import {ProfileComponent} from "../profile.component";
import {ModalPopupService} from "../../modal-popup.service";
import {PostsService} from "../../../../services/posts.service";
import {Post} from "../../../../models/model classes/posts/Post";
import {AddPostPopupComponent} from "../../news-center/add-post-popup/add-post-popup.component";
import {DialogSize} from "../../../../models/model classes/DialogSize";
import {filter, map, mergeMap} from "rxjs/operators";

@Component({
    selector: 'app-individual-profile',
    templateUrl: './individual-profile.component.html',
    styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent extends ProfileComponent implements OnInit {
    posts: Post[] = [];

    constructor(
        public usersApi: UserApiService,
        public router: Router,
        public dialogService: ModalPopupService,
        public postsService: PostsService)
    {
        super(usersApi, router, dialogService);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this.usersApi.getPosts(this.userInfo, 1)
            .subscribe((posts) => this.posts = posts.items);
    }

    addPost() {
        this.modalPopupService.openDialogComponent(AddPostPopupComponent, null, DialogSize.mediumLarge)
            .pipe(filter((res) => res != null))
            .pipe(mergeMap((p) => {
                const post = p as Post;
                const category = this.usersApi.getCategoryForPost();
                return this.postsService
                    .createCategory(category)
                    .pipe(mergeMap(() => this.postsService.createPost(post)))
                    .pipe(map(() => post));
            }))
            .subscribe((post) => this.posts.push(post));
    }


}
