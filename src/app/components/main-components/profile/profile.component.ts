import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {User} from "../../../models/model classes/user/User";
import {catchError, filter, mergeMap, share} from "rxjs/operators";
import {Router} from "@angular/router";
import {handleJWTError} from "../../../models/Global";
import {UserDetails} from "../../../models/model classes/user/UserDetails";
import {ModalPopupService} from "../modal-popup.service";
import {IndividualUserDetailsPopupComponent} from "./individual-user-details-popup/individual-user-details-popup.component";
import {DialogSize} from "../../../models/model classes/DialogSize";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userInfo: User
    userDetails: UserDetails;
    pageReady = false
    shouldCompleteUserDetails = false;

    constructor(public usersApi: UserApiService, public router: Router, public modalPopupService: ModalPopupService) {
    }

    ngOnInit(): void {
        const userDetails = this.usersApi.getUserInfo()
            .pipe(catchError((e) => handleJWTError(e, this.router)))
            .pipe(mergeMap((user) => {
                this.userInfo = user;
                this.pageReady = true;
                return this.usersApi.getUserDetails()
            }))
            .pipe(share());

        // user details dne - create user details
        userDetails.pipe(filter((details) => details.length === 0))
            .subscribe(() => this.shouldCompleteUserDetails = true);

        // user detail exists
        userDetails.pipe(filter((details) => details.length !== 0))
            .subscribe((details) => this.userDetails = details[0]);
    }

    completeProfile() {
        let userDetails: UserDetails;
        if (this.userInfo.type === 0) { // Individual user
            this.modalPopupService
                .openDialogComponent(IndividualUserDetailsPopupComponent, this.userInfo)
                .pipe(filter((result) => result != null))
                .pipe(mergeMap((result) => {
                    userDetails = result as UserDetails;
                    return this.usersApi.setUserDetails(result);
                }))
                .subscribe(() => this.userDetails = userDetails);
        } else {

        }

    }

}
