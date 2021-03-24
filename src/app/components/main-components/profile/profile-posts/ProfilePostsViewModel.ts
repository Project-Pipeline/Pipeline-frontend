import {PostsService} from "../../../../services/posts.service";
import {UserApiService} from "../../../../services/user-api.service";
import {Router} from "@angular/router";
import {empty, Observable, Subject} from "rxjs";
import {UsersAndPosts} from "../../../../models/model classes/posts/Post";
import {map, mergeMap, take} from "rxjs/operators";
import {ModalPopupService} from "../../../../shared/services/modal-popup.service";
import {PageDataMetadata} from "../../../../models/model classes/common/PageData";

export class ProfilePostsViewModel {
    private per = 10;
    private pageMetadataFetched$: Subject<PageDataMetadata> = new Subject<PageDataMetadata>();
    pageMetadataFirstFetched$: Observable<PageDataMetadata> = empty();
    pageChanged$: Subject<number> = new Subject<number>();
    postsFetched$: Observable<UsersAndPosts>;
    constructor(
        private postsService: PostsService,
        private usersApi: UserApiService,
        private modalPopupService: ModalPopupService
    ) {
        this.postsFetched$ = this.pageChanged$
            .pipe(mergeMap((page) => {
                return this.usersApi.getUserInfo()
                    .pipe(mergeMap((user) => {
                        return this.usersApi.getPosts(user, page, this.per)
                            .pipe(map((posts) => {
                                this.pageMetadataFetched$.next(posts.metadata);
                                return new UsersAndPosts([user], posts.items)
                            }));
                    }));
            }));

        this.pageMetadataFirstFetched$ = this.pageMetadataFetched$.pipe(take(1));
    }

    writePost(): Observable<UsersAndPosts> {
        return this.postsService.addPostWithPopup(this.modalPopupService, this.usersApi);
    }
}
