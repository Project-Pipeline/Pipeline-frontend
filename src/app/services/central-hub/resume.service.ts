import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resume} from "../../models/model classes/central-hub/resume/Resume";
import {ConfigService} from "../config.service";
import {AuthService} from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class ResumeService {

    constructor(
        private http: HttpClient,
        private config: ConfigService,
        private authService: AuthService
    ) {
    }

    createResume(resume: Resume): Observable<any> {
        return this.http.post(`${this.config.apiRoot}api/resume`, resume, this.authService.authHeaders());
    }

    updateResume(resume: Resume): Observable<any> {
        return this.http.post(`${this.config.apiRoot}api/resume/update`, resume, this.authService.authHeaders());
    }

    deleteResume(resume: Resume): Observable<any> {
        return this.http.delete(`${this.config.apiRoot}api/resume`, this.authService.authHeadersWithParams({
            id: resume.id
        }));
    }

    markResumeAsActive(resume: Resume): Observable<any> {
        return this.http.get(`${this.config.apiRoot}api/resume/active`, this.authService.authHeadersWithParams({
            id: resume.id
        }));
    }
}
