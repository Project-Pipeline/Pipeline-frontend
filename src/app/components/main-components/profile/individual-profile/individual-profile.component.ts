import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../../../services/user-api.service";
import {Router} from "@angular/router";
import {ProfileComponent} from "../profile.component";
import {ModalPopupService} from "../../modal-popup.service";

@Component({
    selector: 'app-individual-profile',
    templateUrl: './individual-profile.component.html',
    styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent extends ProfileComponent implements OnInit {
    constructor(
        public usersApi: UserApiService,
        public router: Router,
        public dialogService: ModalPopupService)
    {
        super(usersApi, router, dialogService);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }


}
