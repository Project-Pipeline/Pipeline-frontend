import {PostsService} from "../../../services/posts.service";
import {UserApiService} from "../../../services/user-api.service";
import {CategoryForPost} from "../../../models/model classes/posts/CateogryForPost";
import {Observable, Subject} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {Post} from "../../../models/model classes/posts/Post";
import {PageData} from "../../../models/model classes/common/PageData";
import {User} from "../../../models/model classes/user/User";

export class NewsCenterViewModel {
    categorySelected: Subject<CategoryForPost> = new Subject();
    postsFetched: Observable<PageData<Post>>;

    constructor(private postsApi: PostsService, private usersApi: UserApiService) {
        this.postsFetched = this.categorySelected
            .pipe(mergeMap((category) => {
                if (category.name === 'All') return this.postsApi.getAllPosts();
                return this.postsApi.getPostsWithCategories([category])
            }))

    }

    getPostsCategories(): Observable<[CategoryForPost[], boolean[]]>  {
        return this.postsApi.getCategories()
            .pipe(map((categories) => [
                [new CategoryForPost('All', 'All')].concat(categories),
                [false].concat(categories.map(() => false))
            ]));
    }

    getUsersFromPosts(posts: Post[]): Observable<User[]> {
        return this.usersApi.getMultipleUserInfo(posts.map((p) => p.user.id));
    }
}
