import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {from, Observable, of, throwError} from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import {delay} from "rxjs/operators";

export function handleJWTError(error: HttpErrorResponse, router: Router): Observable<any> {
    if (error.error.reason == "malformed JWT") {
        return from(router.navigateByUrl("login?errorMessage=Your session has expired. Please re-login."));
    }
    return throwError(error);
}

export function generateUUID(): string {
    return uuidv4().toUpperCase()
}

export function dateAsUnixTimeStamp(date: Date = new Date()): number {
    return Math.floor(date.getTime() / 1000); // get unix timestamp
}

export function unixTimeStampToDate(time: number): Date {
    return new Date(time * 1000)
}

export function jsonAsBlob(json: any): Blob {
    const string = JSON.stringify(json)
    return new Blob([string], {type: "application/json"});
}

export function delayExecutionFor(milliseconds: number): Observable<any> {
    return of('').pipe(delay(milliseconds));
}
