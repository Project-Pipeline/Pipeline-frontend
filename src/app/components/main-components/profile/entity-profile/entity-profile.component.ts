import {Component, OnInit} from '@angular/core';
import {ProfileComponent} from "../profile.component";
import {UserApiService} from "../../../../services/user-api.service";
import {Router} from "@angular/router";
import {ModalPopupService} from "../../modal-popup.service";

@Component({
    selector: 'app-entity-profile',
    templateUrl: './entity-profile.component.html',
    styleUrls: ['./entity-profile.component.scss']
})
export class EntityProfileComponent extends ProfileComponent implements OnInit {

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
