import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserEmail} from "../models/model classes/user/User";
import {Observable} from "rxjs";
import {ServerResponse} from "../models/model classes/ServerResponse";
import {apiRoot} from "../models/ApiRoot";
import {UserExistence} from "../models/model classes/user/UserExistence";
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

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
        return this.http.get<User>(`${apiRoot}api/user/info`, this.authService.authHeaders());
    }

    setToken(token: string) {
       this.authService.setToken(token);
    }
}
