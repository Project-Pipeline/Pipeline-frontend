import {OpportunitiesService} from "../../../../services/opportunities.service";
import {UserApiService} from "../../../../services/user-api.service";
import {Observable, Subject, throwError} from "rxjs";
import {Opportunity} from "../../../../models/model classes/opportunities/Opportunity";
import {PageData, PageDataMetadata} from "../../../../models/model classes/common/PageData";
import {first, map, mergeMap, share, take} from "rxjs/operators";
import {ModalPopupService} from "../../../../shared/services/modal-popup.service";
import {OpportunityDetailsComponent} from "../../opportunities/opportunity-details/opportunity-details.component";
import {DialogSize} from "../../../../models/model classes/DialogSize";
import {User} from "../../../../models/model classes/user/User";
import {UserDetails} from "../../../../models/model classes/user/UserDetails";

export class ProfileOpportunitiesViewModel {
    private per = 6;

    private pageChanged$: Subject<number> = new Subject<number>();
    metadataFirstFetched$: Observable<PageDataMetadata>;
    opportunitiesFetched$: Observable<PageData<Opportunity>>;

    constructor(
        private opportunitiesService: OpportunitiesService,
        private userApi: UserApiService,
        private modalPopupService: ModalPopupService
    ) {
        this.opportunitiesFetched$ = this.pageChanged$
            .pipe(mergeMap((page) => this.userApi.getOpportunities(page, this.per)))
            .pipe(share());

        this.metadataFirstFetched$ = this.opportunitiesFetched$
            .pipe(first())
            .pipe(map((result) => result.metadata));

    }

    getOpportunities(page: number) {
        this.pageChanged$.next(page);
    }

    removeOpportunity(opportunity: Opportunity): Observable<any> {
        return this.opportunitiesService
            .deleteOpportunity(opportunity)
            .pipe(take(1));
    }

    showOpportunity(opportunity: Opportunity): Observable<any> {
        return this.modalPopupService.openComponentAsDialog(
            OpportunityDetailsComponent,
            DialogSize.large,
            opportunity,
            false
        )
            .pipe(take(1));
    }

    addOpportunity(userInfo: User, userDetails: UserDetails): Observable<Opportunity> {
        if (!userDetails) return throwError('Must have user details');
        return this.opportunitiesService.addOpportunityWithPopup(this.modalPopupService, userInfo, userDetails)
            .pipe(take(1));
    }
}
