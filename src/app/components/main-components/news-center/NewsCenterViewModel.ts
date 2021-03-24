import {PostsService} from '../../../services/posts.service';
import {UserApiService} from '../../../services/user-api.service';
import {CategoryForPost} from '../../../models/model classes/posts/CateogryForPost';
import {Observable, Subject} from 'rxjs';
import {exhaustMap, filter, map, share} from 'rxjs/operators';
import {Post, UsersAndPosts} from '../../../models/model classes/posts/Post';
import {PageData, PageDataMetadata} from '../../../models/model classes/common/PageData';
import {User} from '../../../models/model classes/user/User';
import {ModalPopupService} from "../../../shared/services/modal-popup.service";

export class NewsCenterViewModel {
    pageChanged$: Subject<number> = new Subject();
    postsFetched$: Observable<PageData<Post>>;
    postsFetchedWithNewCategory$: Observable<PageDataMetadata>;
    newCategory = false;
    category: CategoryForPost;

    private per = 10;

    constructor(
        private postsApi: PostsService,
        private usersApi: UserApiService,
        private modalPopupService: ModalPopupService
    ) {
        this.postsFetched$ = this.pageChanged$
            .pipe(exhaustMap((page) => {
                if (this.category.name === 'All') {
                    return this.postsApi.getAllPosts(page, this.per);
                }
                return this.postsApi.getPostsWithCategories([this.category], page, this.per);
            }))
            .pipe(share());

        this.postsFetchedWithNewCategory$ = this.postsFetched$
            .pipe(filter(() => this.newCategory))
            .pipe(map((posts) => posts.metadata));
    }

    getPostsCategories(): Observable<[CategoryForPost[], boolean[]]>  {
        return this.postsApi.getCategories()
            .pipe(map((categories) => [
                [new CategoryForPost('All', 'All')].concat(categories),
                [false].concat(categories.map(() => false))
            ]));
    }

    getUsersFromPosts(posts: Post[]): Observable<User[]> {
        return this.usersApi.getMultipleUserInfo(
            posts.map((p) => p.user.id)
        );
    }

    setNewCategory(category: CategoryForPost) {
        this.category = category;
        this.newCategory = true;
        this.pageChanged$.next(1);
    }

    addPost(): Observable<UsersAndPosts> {
        return this.postsApi.addPostWithPopup(this.modalPopupService, this.usersApi);
    }
}
