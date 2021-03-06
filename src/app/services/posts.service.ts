import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostAndCategoryWrapper, Post} from "../models/model classes/posts/Post";
import {CategoryForPost} from "../models/model classes/posts/CateogryForPost";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {PageData} from "../models/model classes/common/PageData";
import {ConfigService} from "./config.service";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private postsCategoryRoute;
    private postsRoute;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private configService: ConfigService) {
        this.postsRoute = `${configService.apiRoot}api/posts`;
        this.postsCategoryRoute =  `${configService.apiRoot}api/posts/category`;
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
        )
    }

    getAllPosts(): Observable<PageData<Post>> {
        return this.http.get<PageData<Post>>(
            this.postsRoute,
            this.authService.authHeaders()
        )
    }

    getPostsWithCategories(categories: CategoryForPost[]): Observable<PageData<Post>> {
        return this.http.get<PageData<Post>>(
            this.postsRoute,
            this.authService.authHeadersWithParams({
                category: categories.map((c) => c.id).join(',')
            })
        )
    }


}
