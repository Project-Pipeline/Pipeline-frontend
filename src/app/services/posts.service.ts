import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostAndCategoryWrapper, Post, UsersAndPosts} from "../models/model classes/posts/Post";
import {CategoryForPost} from "../models/model classes/posts/CateogryForPost";
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {PageData} from "../models/model classes/common/PageData";
import {ConfigService} from "./config.service";
import {PageDataMetadata} from "../models/model classes/common/PageData";
import {LikeForPost} from "../models/model classes/posts/LikeForPost";
import {CommentForPost} from "../models/model classes/posts/CommentForPost";
import {AddPostPopupComponent} from "../components/main-components/news-center/add-post-popup/add-post-popup.component";
import {DialogSize} from "../models/model classes/DialogSize";
import {filter, map, mergeMap, take} from "rxjs/operators";
import {ModalPopupService} from "../shared/services/modal-popup.service";
import {UserApiService} from "./user-api.service";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private postsCategoryRoute;
    private postsRoute;
    private postsLikeRoute;
    private postsCommentRoute;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private configService: ConfigService) {
        this.postsRoute = `${configService.apiRoot}api/posts`;
        this.postsCategoryRoute =  `${configService.apiRoot}api/posts/category`;
        this.postsLikeRoute = `${configService.apiRoot}api/posts/like`;
        this.postsCommentRoute = `${configService.apiRoot}api/posts/comment`;
    }

    // Categories

    getCategories(): Observable<CategoryForPost[]> {
        return this.http.get<CategoryForPost[]>(
            this.postsCategoryRoute,
            this.authService.authHeaders()
        );
    }

    // POSTS

    createPost(postAndCategory: PostAndCategoryWrapper): Observable<any> {
        return this.http.post<CategoryForPost>(
            this.postsRoute,
            postAndCategory,
            this.authService.authHeaders()
        );
    }

    getAllPosts(page: number = 1, per: number = 5): Observable<PageData<Post>> {
        return this.http.get<PageData<Post>>(
            this.postsRoute,
            this.authService.authHeadersWithParams({
                page: `${page}`,
                per: `${per}`
            })
        );
    }

    getPostsWithCategories(
        categories: CategoryForPost[],
        page: number = 1,
        per: number = 5,
    ): Observable<PageData<Post>> {
        if (categories.length === 0) {
            return of(new PageData<Post>([], new PageDataMetadata(0, 0, 0)));
        }
        return this.http.get<PageData<Post>>(
            this.postsRoute,
            this.authService.authHeadersWithParams({
                category: categories.map((c) => c.id).join(','),
                page: `${page}`,
                per: `${per}`
            })
        );
    }

    getCommentsForPostsWithId(postId: string): Observable<PageData<CommentForPost>>{
        return this.http.get<PageData<CommentForPost>>(
            this.postsCommentRoute,
            this.authService.authHeadersWithParams({
                postId: postId
            })
        );
    }

    addCommentToPost(comment: CommentForPost): Observable<any> {
        return this.http.post<any>(
            this.postsCommentRoute,
            comment,
            this.authService.authHeaders()
        );
    }

    getLikesForPostWithId(postId: string): Observable<PageData<LikeForPost>> {
        return this.http.get<PageData<LikeForPost>>(
            this.postsLikeRoute,
            this.authService.authHeadersWithParams({
                postId: postId
            })
        );
    }

    addLikeToPost(like: LikeForPost): Observable<any> {
        return this.http.post<any>(
            this.postsLikeRoute,
            like,
            this.authService.authHeaders()
        );
    }

    addPostWithPopup(
        modalPopupService: ModalPopupService,
        usersApi: UserApiService
    ): Observable<UsersAndPosts> {
        return modalPopupService.openDialogComponent(
            AddPostPopupComponent,
            null,
            DialogSize.mediumLarge
        )
            .pipe(filter((res) => res != null))
            .pipe(mergeMap((p) => {
                const post = p as Post;
                const category = usersApi.getCategoryForPost();
                const postAndCategory = new PostAndCategoryWrapper(post, category);
                return this.createPost(postAndCategory)
                    .pipe(mergeMap(() => usersApi.getUserInfo()))
                    .pipe(map((user) => new UsersAndPosts([user], [post])));
            }))
            .pipe(take(1));
    }


}
