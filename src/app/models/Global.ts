import {Observable, of} from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import {delay} from "rxjs/operators";

export function generateUUID(): string {
    return uuidv4().toUpperCase();
}

export function dateAsUnixTimeStamp(date: Date = new Date()): number {
    return Math.floor(date.getTime() / 1000); // get unix timestamp
}

export function unixTimeStampToDate(time: number): Date {
    return new Date(time * 1000);
}

export function jsonAsBlob(json: any): Blob {
    const string = JSON.stringify(json);
    return new Blob([string], {type: "application/json"});
}

export function delayExecutionFor(milliseconds: number): Observable<any> {
    return of('').pipe(delay(milliseconds));
}

export function urlComponentAfter(
    component: string,
    url: string = window.location.href
): string {
    let components = url.split('/')
        .map((c) => c.split("?")[0]); // remove query params
    let indexOfGivenComp = components.indexOf(component);
    if (indexOfGivenComp != -1 && indexOfGivenComp + 1 < components.length) {
        return components[indexOfGivenComp + 1];
    }
    return null;
}
