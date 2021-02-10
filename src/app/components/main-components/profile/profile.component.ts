import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {User} from "../../../models/model classes/user/User";
import {catchError, filter, mergeMap, share} from "rxjs/operators";
import {Router} from "@angular/router";
import {handleJWTError} from "../../../models/Global";
import {UserDetails} from "../../../models/model classes/user/UserDetails";
import {ModalPopupService} from "../modal-popup.service";
import {IndividualUserDetailsPopupComponent} from "./individual-user-details-popup/individual-user-details-popup.component";
import {empty, Observable} from "rxjs";
import {EntityUserDetailsPopupComponent} from "./entity-user-details-popup/entity-user-details-popup.component";
import {entityUserTypes, individualUserTypes} from "../../../models/BusinessConstants";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userInfo: User
    userDetails: UserDetails = null;
    pageReady = false
    shouldCompleteUserDetails = false;
    isIndividual = false;
    isEntity = false;
    private typeToStringLookup: {[key: number]: string} = {
        0: 'student',
        1: 'teacher',
        2: 'working professional',
        3: 'company',
        4: 'community organization',
        5: 'school'
    }

    constructor(public usersApi: UserApiService, public router: Router, public modalPopupService: ModalPopupService) {

    }

    ngOnInit(): void {
        const userDetails = this.usersApi.getUserInfo()
            .pipe(catchError((e) => handleJWTError(e, this.router)))
            .pipe(mergeMap((user) => {
                this.userInfo = user;
                this.prepareUserType(user);
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
        let getUserDetails: Observable<any> = empty();
        if (individualUserTypes.includes(this.userInfo.type)) { // Individual user
            getUserDetails = this.modalPopupService.openDialogComponent(
                IndividualUserDetailsPopupComponent,
                this.userInfo
            );
        } else if (entityUserTypes.includes(this.userInfo.type)) { // an entity
            getUserDetails = this.modalPopupService.openDialogComponent(
                EntityUserDetailsPopupComponent,
                this.userInfo
            );
        }
        getUserDetails
            .pipe(filter((result) => result != null))
            .pipe(mergeMap((result) => {
                userDetails = result as UserDetails;
                return this.usersApi.setUserDetails(result);
            }))
            .subscribe(() => this.userDetails = userDetails);
    }

    prepareUserType(userInfo: User) {
        this.isIndividual = individualUserTypes.includes(userInfo.type);
        this.isEntity = entityUserTypes.includes(userInfo.type);
    }

    typeToString(): string {
        return this.typeToStringLookup[this.userInfo.type];
    }


}
