import {Injectable, SkipSelf} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserEmail} from "../models/model classes/user/User";
import {Observable, of} from "rxjs";
import {ServerResponse} from "../models/model classes/ServerResponse";
import {UserExistence} from "../models/model classes/user/UserExistence";
import {map, mergeMap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {UserDetails} from "../models/model classes/user/UserDetails";
import {Opportunity} from "../models/model classes/opportunities/Opportunity";
import {PageData} from "../models/model classes/common/PageData";
import {Post} from "../models/model classes/posts/Post";
import {CategoryForPost} from "../models/model classes/posts/CateogryForPost";
import {categoryToId, postCategoryLookUp} from "../models/BusinessConstants";
import {ConfigService} from "./config.service";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    currentUser: User = null;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private configService: ConfigService
    ) {
    }

    createUserWith(user: User): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(`${this.configService.apiRoot}api/user/create`, user);
    }

    userExists(userEmail: string): Observable<boolean> {
        let userEmail2 = new UserEmail(userEmail);
        return this.http.post<UserExistence>(`${this.configService.apiRoot}api/user/exists`, userEmail2)
            .pipe(map((exist) => exist.exists));
    }

    getUserInfo(): Observable<User> {
        if (this.currentUser != null) {
            return of(this.currentUser);
        }
        return this.http
            .get<User>(`${this.configService.apiRoot}api/user/info`, this.authService.authHeaders())
            .pipe(mergeMap((user) => {
                this.currentUser = user;
                return of(user);
            }));
    }

    getMultipleUserInfo(userIds: string[]): Observable<User[]> {
        return this.http
            .get<User[]>(
                `${this.configService.apiRoot}api/user/info/multiple`,
                this.authService.authHeadersWithParams({
                    ids: userIds.join(',')
                })
            );
    }

    setToken(token: string) {
       this.authService.setToken(token);
    }

    searchUser(query: string, method: string): Observable<User[]> {
        return this.http.get<User[]>(
            `${this.configService.apiRoot}api/user/search?query=${query}&method=${method}`,
            this.authService.authHeaders()
        );
    }

    getUserDetails(): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(
            `${this.configService.apiRoot}api/user/details`,
            this.authService.authHeaders()
        );
    }

    setUserDetails(details: UserDetails): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(
            `${this.configService.apiRoot}api/user/details`,
            details,
            this.authService.authHeaders()
        );
    }

    getOpportunities(page: number, per: number = 5): Observable<PageData<Opportunity>> {
        return this.http.get<PageData<Opportunity>>(
            `${this.configService.apiRoot}api/user/opportunities`,
            this.authService.authHeadersWithParams({
                page: `${page}`,
                per: `${per}`
            })
        );
    }

    getPosts(user: User, page: number, per: number = 5): Observable<PageData<Post>> {
        return this.http.get<PageData<Post>>(
            `${this.configService.apiRoot}api/user/posts`,
            this.authService.authHeadersWithParams({
                id: user.id,
                page: `${page}`,
                per: `${per}`
            })
        );
    }

    getCategoryForPost(): CategoryForPost {
        const cat = postCategoryLookUp[this.currentUser.type];
        return new CategoryForPost(categoryToId(cat), cat);
    }

}
