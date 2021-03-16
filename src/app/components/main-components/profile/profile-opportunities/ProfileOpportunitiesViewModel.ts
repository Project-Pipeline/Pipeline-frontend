import {OpportunitiesService} from "../../../../services/opportunities.service";
import {UserApiService} from "../../../../services/user-api.service";
import {Observable, Subject} from "rxjs";
import {Opportunity} from "../../../../models/model classes/opportunities/Opportunity";
import {PageData, PageDataMetadata} from "../../../../models/model classes/common/PageData";
import {first, map, mergeMap, share, take} from "rxjs/operators";

export class ProfileOpportunitiesViewModel {
    private per = 9;

    private pageChanged$: Subject<number> = new Subject<number>();
    metadataFirstFetched$: Observable<PageDataMetadata>;
    opportunitiesFetched$: Observable<PageData<Opportunity>>;

    constructor(
        private opportunitiesService: OpportunitiesService,
        private userApi: UserApiService
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
}
