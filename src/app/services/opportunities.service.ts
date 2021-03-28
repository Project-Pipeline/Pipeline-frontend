import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {OpportunitiesContentsWrapper, Opportunity} from "../models/model classes/opportunities/Opportunity";
import {Observable} from "rxjs";
import {Zipcode} from "../models/model classes/opportunities/Zipcode";
import {OpportunityCategory} from "../models/model classes/opportunities/OpportunityCategory";
import {opportunityCategoryToId} from "../models/BusinessConstants";
import {ConfigService} from "./config.service";
import {AddOpportunityPopupComponent} from "../components/profile/add-opportunity-popup/add-opportunity-popup.component";
import {UserAndDetailCombo} from "../models/model classes/user/UserAndDetailCombo";
import {filter, map, mergeMap} from "rxjs/operators";
import {ModalPopupService} from "../shared/services/modal-popup.service";
import {User} from "../models/model classes/user/User";
import {UserDetails} from "../models/model classes/user/UserDetails";

@Injectable({
    providedIn: 'root'
})
export class OpportunitiesService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private configService: ConfigService) {

    }

    createOpportunity(opportunity: Opportunity): Observable<any> {
        const wrapper = new OpportunitiesContentsWrapper(
            opportunity,
            new Zipcode(opportunity.address.postalCode),
            new OpportunityCategory(opportunityCategoryToId(opportunity.category))
        );
        return this.http.post<any>(
            `${this.configService.apiRoot}api/opportunities`,
            wrapper,
            this.authService.authHeaders()
        )
    }

    deleteOpportunity(opportunity: Opportunity): Observable<any> {
        const url = `${this.configService.apiRoot}api/opportunities`
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
            `${this.configService.apiRoot}api/opportunities`,
            this.authService.authHeadersWithParams(params)
        );
    }

    addOpportunityWithPopup(
        modalPopupService: ModalPopupService,
        userInfo: User,
        userDetails: UserDetails
    ): Observable<Opportunity> {
        let createdOpportunity: Opportunity = null;
        return modalPopupService.openDialogComponent(
            AddOpportunityPopupComponent,
            new UserAndDetailCombo(userInfo, userDetails)
        )
            .pipe(filter((result) => result != null))
            .pipe(mergeMap((op) => {
                createdOpportunity = op as Opportunity;
                return this.createOpportunity(createdOpportunity)
                    .pipe(map(() => createdOpportunity));
            }));
    }
}
