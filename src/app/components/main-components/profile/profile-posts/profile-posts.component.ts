import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../../../services/posts.service";
import {Post} from "../../../../models/model classes/posts/Post";
import {takeUntil} from "rxjs/operators";
import {UserApiService} from "../../../../services/user-api.service";
import {User} from "../../../../models/model classes/user/User";
import {Router} from "@angular/router";
import {ProfilePostsViewModel} from "./ProfilePostsViewModel";
import {ModalPopupService} from "../../modal-popup.service";
import {Subject} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
    selector: 'app-profile-posts',
    templateUrl: './profile-posts.component.html',
    styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    user: User = null;
    viewModel: ProfilePostsViewModel;
    unsubscribe$: Subject<void> = new Subject<void>();
    total = 0;
    per = 0;
    page = 1;

    constructor(
        postsService: PostsService,
        usersApi: UserApiService,
        router: Router,
        modalPopupService: ModalPopupService,
        private spinner: NgxSpinnerService
    ) {
        this.viewModel = new ProfilePostsViewModel(postsService, usersApi, router, modalPopupService);
    }

    ngOnInit(): void {
        this.viewModel.postsFetched$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res) => {
                this.posts = res.posts;
                this.user = res.users[0];
                this.spinner.hide();
            });

        this.viewModel.pageMetadataFirstFetched$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((metadata) => {
               this.page = metadata.page;
               this.per = metadata.per;
               this.total = metadata.total;
            });

        this.spinner.show();
        this.viewModel.pageChanged$.next(1);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    writePost() {
        this.viewModel.writePost()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res) => this.posts = res.posts.concat(this.posts));
    }

    pageChanged(page: number) {
        this.spinner.show();
        this.viewModel.pageChanged$.next(page);
    }

}
