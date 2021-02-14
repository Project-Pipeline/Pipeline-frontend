import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {OpportunitiesContentsWrapper, Opportunity} from "../models/model classes/opportunities/Opportunity";
import {Observable} from "rxjs";
import {apiRoot} from "../models/ApiRoot";
import {Zipcode} from "../models/model classes/opportunities/Zipcode";

@Injectable({
    providedIn: 'root'
})
export class OpportunitiesService {

    constructor(private http: HttpClient, private authService: AuthService) {

    }

    createOpportunity(opportunity: Opportunity): Observable<any> {
        const wrapper = new OpportunitiesContentsWrapper(
            opportunity,
            new Zipcode(opportunity.address.postalCode)
        )
        return this.http.post<any>(
            `${apiRoot}api/opportunities`,
            wrapper,
            this.authService.authHeaders()
        )
    }
}
