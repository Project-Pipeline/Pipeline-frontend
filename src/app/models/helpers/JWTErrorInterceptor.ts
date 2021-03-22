import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import {Router} from "@angular/router";
import {from, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

// Intercepts errors from the server, if JWT token has expired, redirect user to login
// Interceptors will only work if they are injected at the root module (app.module.ts)
@Injectable()
export class JWTErrorInterceptor implements HttpInterceptor {
    constructor(public router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError((e) => JWTErrorInterceptor.handleJWTError(e, this.router)));
    }

    private static handleJWTError(error: HttpErrorResponse, router: Router): Observable<any> {
        if (error.error.reason === "malformed JWT") {
            return from(router.navigate(
                ["login"],
                { queryParams: {
                    errorMessage: 'Your session has expired. Please re-login.'
                }}
            ));
        }
        return throwError(error);
    }
}
