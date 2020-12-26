import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User, UserEmail} from "../models/model classes/user/User";
import {Observable} from "rxjs";
import {ServerResponse} from "../models/model classes/ServerResponse";
import {apiRoot} from "../models/ApiRoot";
import {UserExistence} from "../models/model classes/user/UserExistence";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    constructor(private http: HttpClient) {
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
        return this.http.get<User>(`${apiRoot}api/user/info`, this.authHeaders());
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    private authHeaders() {
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`
            })
        };
    }
}
