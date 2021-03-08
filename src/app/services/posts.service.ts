import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostAndCategoryWrapper, Post} from "../models/model classes/posts/Post";
import {CategoryForPost} from "../models/model classes/posts/CateogryForPost";
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs";
import {PageData} from "../models/model classes/common/PageData";
import {ConfigService} from "./config.service";
import {PageDataMetadata} from "../models/model classes/common/PageData";
import {LikeForPost} from "../models/model classes/posts/LikeForPost";
import {CommentForPost} from "../models/model classes/posts/CommentForPost";

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


}
