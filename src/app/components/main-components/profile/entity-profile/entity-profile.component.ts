import {Component, OnInit} from '@angular/core';
import {ProfileComponent} from "../profile.component";
import {UserApiService} from "../../../../services/user-api.service";
import {Router} from "@angular/router";
import {ModalPopupService} from "../../modal-popup.service";
import {AddOpportunityPopupComponent} from "../../opportunities/add-opportunity-popup/add-opportunity-popup.component";
import {UserAndDetailCombo} from "../../../../models/model classes/user/UserAndDetailCombo";
import {OpportunitiesService} from "../../../../services/opportunities.service";
import {filter, mergeMap} from "rxjs/operators";
import {Opportunity} from "../../../../models/model classes/opportunities/Opportunity";

@Component({
    selector: 'app-entity-profile',
    templateUrl: './entity-profile.component.html',
    styleUrls: ['./entity-profile.component.scss']
})
export class EntityProfileComponent extends ProfileComponent implements OnInit {
    opportunities: Opportunity[] = [];

    constructor(
        public usersApi: UserApiService,
        public router: Router,
        public dialogService: ModalPopupService,
        public opportunitiesService: OpportunitiesService)
    {
        super(usersApi, router, dialogService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.usersApi.getOpportunities()
            .subscribe((ops) => this.opportunities = ops)
    }

    addOpportunity() {
        let createdOpportunity: Opportunity = null;
        this.modalPopupService.openDialogComponent(
            AddOpportunityPopupComponent,
            new UserAndDetailCombo(this.userInfo, this.userDetails)
        )
            .pipe(filter((result) => result != null))
            .pipe(mergeMap((op) => {
                createdOpportunity = op as Opportunity;
                return this.opportunitiesService.createOpportunity(createdOpportunity);
            }))
            .subscribe(() => this.opportunities = [createdOpportunity].concat(this.opportunities));
    }

}
