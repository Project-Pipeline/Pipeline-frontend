import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/model classes/posts/Post";
import {CategoryForPost} from "../models/model classes/posts/CateogryForPost";
import {apiRoot} from "../models/ApiRoot";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {PageData} from "../models/model classes/common/PageData";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private postsCategoryRoute = `${apiRoot}api/posts/category`;
    private postsRoute = `${apiRoot}api/posts`;

    constructor(private http: HttpClient, private authService: AuthService) {

    }

    // Categories

    createCategory(category: CategoryForPost): Observable<CategoryForPost> {
        return this.http.post<CategoryForPost>(
            this.postsCategoryRoute,
            category,
            this.authService.authHeaders()
        )
    }

    getCategories(): Observable<CategoryForPost[]> {
        return this.http.get<CategoryForPost[]>(
            this.postsCategoryRoute,
            this.authService.authHeaders()
        );
    }

    // POSTS

    createPost(post: Post): Observable<any> {
        return this.http.post<CategoryForPost>(
            this.postsRoute,
            post,
            this.authService.authHeaders()
        )
    }

    getAllPosts(): Observable<PageData<Post>> {
        return this.http.get<PageData<Post>>(
            this.postsRoute + '/all',
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