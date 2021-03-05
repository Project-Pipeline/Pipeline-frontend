import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostAndCategoryWrapper} from "../models/model classes/posts/Post";
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

    createPost(postAndCategory: PostAndCategoryWrapper): Observable<any> {
        return this.http.post<CategoryForPost>(
            `${apiRoot}api/posts`,
            postAndCategory,
            this.authService.authHeaders()
        )
    }


}
