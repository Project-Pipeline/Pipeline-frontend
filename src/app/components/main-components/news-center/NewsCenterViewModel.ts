import {PostsService} from '../../../services/posts.service';
import {UserApiService} from '../../../services/user-api.service';
import {CategoryForPost} from '../../../models/model classes/posts/CateogryForPost';
import {combineLatest, Observable, Subject} from 'rxjs';
import {exhaustMap, map} from 'rxjs/operators';
import {Post} from '../../../models/model classes/posts/Post';
import {PageData} from '../../../models/model classes/common/PageData';
import {User} from '../../../models/model classes/user/User';

export class NewsCenterViewModel {
    categorySelected$: Subject<CategoryForPost> = new Subject();
    pageChanged$: Subject<number> = new Subject();
    postsFetched$: Observable<PageData<Post>>;
    newCategory = false;

    private per = 5;

    constructor(private postsApi: PostsService, private usersApi: UserApiService) {
       this.initPostsObservations();
    }

    initPostsObservations() {
        this.postsFetched$ = combineLatest([
            this.categorySelected$.pipe(map((p) => {
                this.newCategory = true;
                return p;
            })),
            this.pageChanged$
        ]).pipe(exhaustMap(([category, page]) => {
            if (category.name === 'All') {
                return this.postsApi.getAllPosts(page, this.per);
            }
            return this.postsApi.getPostsWithCategories([category], page, this.per);
        }));
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
}
