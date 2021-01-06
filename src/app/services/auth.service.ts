import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    authHeaders() {
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.getToken()}`
            })
        };
    }
}
