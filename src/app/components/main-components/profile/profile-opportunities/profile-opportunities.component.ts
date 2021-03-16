import {Component, OnDestroy, OnInit} from '@angular/core';
import {Opportunity} from "../../../../models/model classes/opportunities/Opportunity";
import {ProfileOpportunitiesViewModel} from "./ProfileOpportunitiesViewModel";
import {OpportunitiesService} from "../../../../services/opportunities.service";
import {UserApiService} from "../../../../services/user-api.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-profile-opportunities',
    templateUrl: './profile-opportunities.component.html',
    styleUrls: ['./profile-opportunities.component.scss']
})
export class ProfileOpportunitiesComponent implements OnInit, OnDestroy {
    opportunities: Opportunity[] = [];
    viewModel: ProfileOpportunitiesViewModel;
    page = 1;
    per = 0;
    total = 0
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        opportunitiesService: OpportunitiesService,
        userApi: UserApiService,
        private spinner: NgxSpinnerService
    ) {
        this.viewModel = new ProfileOpportunitiesViewModel(opportunitiesService, userApi);
    }

    ngOnInit(): void {
        this.spinner.show();
        this.viewModel.opportunitiesFetched$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((opportunities) => {
                this.opportunities = opportunities.items;
                this.spinner.hide();
            }, () => this.spinner.hide());

        this.viewModel.metadataFirstFetched$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((metadata) => {
               this.page = metadata.page;
               this.total = metadata.total;
               this.per = metadata.per;
            });

        this.getOpportunities(1);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    removeOpportunityAt(index: number, opportunity: Opportunity) {
        this.viewModel.removeOpportunity(opportunity)
            .subscribe(() =>  this.opportunities.splice(index, 1));
    }

    getOpportunities(page: number) {
        this.viewModel.getOpportunities(page);
        this.spinner.show();
    }

}
