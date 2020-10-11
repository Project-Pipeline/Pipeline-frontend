import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {from, Observable, throwError} from "rxjs";

export function handleJWTError(error: HttpErrorResponse, router: Router): Observable<any> {
    if (error.error.reason == "JWT Error") {
        return from(router.navigateByUrl("login?errorMessage=Your session has expired. Please re-login."));
    }
    return throwError(error);
}
