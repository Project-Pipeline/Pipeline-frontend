import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {OpportunitiesContentsWrapper, Opportunity} from "../models/model classes/opportunities/Opportunity";
import {Observable} from "rxjs";
import {apiRoot} from "../models/ApiRoot";
import {Zipcode} from "../models/model classes/opportunities/Zipcode";
import {OpportunityCategory} from "../models/model classes/opportunities/OpportunityCategory";
import {opportunityCategoryToId} from "../models/BusinessConstants";

@Injectable({
    providedIn: 'root'
})
export class OpportunitiesService {

    constructor(private http: HttpClient, private authService: AuthService) {

    }

    createOpportunity(opportunity: Opportunity): Observable<any> {
        const wrapper = new OpportunitiesContentsWrapper(
            opportunity,
            new Zipcode(opportunity.address.postalCode),
            new OpportunityCategory(opportunityCategoryToId(opportunity.category))
        );
        return this.http.post<any>(
            `${apiRoot}api/opportunities`,
            wrapper,
            this.authService.authHeaders()
        )
    }

    deleteOpportunity(opportunity: Opportunity): Observable<any> {
        const url = `${apiRoot}api/opportunities`
        return this.http.delete(url, this.authService.authHeadersWithParams({
            opportunityId: opportunity.id,
            zipcode: opportunity.address.postalCode,
            categoryId: opportunityCategoryToId(opportunity.category)
        }))
    }

    getOpportunities(categories: string[] = [], zipcodes: string[] = []): Observable<Opportunity[]> {
        let params = new HttpParams();
        if (zipcodes.length > 0) {
            params = params.append('zipcode', zipcodes.join(','));
        }
        if (categories.length > 0) {
            params = params.append(
                'category',
                categories.map((c) => opportunityCategoryToId(c)).join(',')
            );
        }
        return this.http.get<Opportunity[]>(
            `${apiRoot}api/opportunities`,
            this.authService.authHeadersWithParams(params)
        );
    }
}
