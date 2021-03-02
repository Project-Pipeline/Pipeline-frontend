import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/model classes/posts/Post";
import {CategoryForPost} from "../models/model classes/posts/CateogryForPost";
import {apiRoot} from "../models/ApiRoot";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient, private authService: AuthService) {

    }

    createCategory(category: CategoryForPost): Observable<CategoryForPost> {
        return this.http.post<CategoryForPost>(
            `${apiRoot}api/posts/category`,
            category,
            this.authService.authHeaders()
        )
    }

    createPost(post: Post): Observable<any> {
        return this.http.post<CategoryForPost>(
            `${apiRoot}api/posts`,
            post,
            this.authService.authHeaders()
        )
    }


}
