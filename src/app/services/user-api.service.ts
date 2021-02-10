import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserEmail} from "../models/model classes/user/User";
import {Observable, of} from "rxjs";
import {ServerResponse} from "../models/model classes/ServerResponse";
import {apiRoot} from "../models/ApiRoot";
import {UserExistence} from "../models/model classes/user/UserExistence";
import {map, mergeMap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {UserDetails} from "../models/model classes/user/UserDetails";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {
    currentUser: User = null;

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    createUserWith(user: User): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(`${apiRoot}api/user/create`, user);
    }

    userExists(userEmail: string): Observable<boolean> {
        let userEmail2 = new UserEmail(userEmail);
        return this.http.post<UserExistence>(`${apiRoot}api/user/exists`, userEmail2)
            .pipe(map((exist) => exist.exists));
    }

    getUserInfo(): Observable<User> {
        if (this.currentUser != null) {
            return of(this.currentUser);
        }
        return this.http
            .get<User>(`${apiRoot}api/user/info`, this.authService.authHeaders())
            .pipe(mergeMap((user) => {
                this.currentUser = user;
                return of(user);
            }));
    }

    setToken(token: string) {
       this.authService.setToken(token);
    }

    searchUser(query: string, method: string): Observable<User[]> {
        return this.http.get<User[]>(
            `${apiRoot}api/user/search?query=${query}&method=${method}`,
            this.authService.authHeaders()
        );
    }

    getUserDetails(): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(
            `${apiRoot}api/user/details`,
            this.authService.authHeaders()
        );
    }

    setUserDetails(details: UserDetails): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(
            `${apiRoot}api/user/details`,
            details,
            this.authService.authHeaders()
        );
    }
}
