import {Component, OnInit} from '@angular/core';
import {ProfileTabComponent} from "../ProfileTabComponent";
import {UserDetails} from "../../../models/model classes/user/UserDetails";
import {User} from "../../../models/model classes/user/User";
import {ProfileAboutViewModel} from "./ProfileAboutViewModel";
import {ModalPopupService} from "../../../shared/services/modal-popup.service";
import {UserApiService} from "../../../services/user-api.service";

@Component({
    selector: 'app-profile-about',
    templateUrl: './profile-about.component.html',
    styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit, ProfileTabComponent {
    userDetails: UserDetails;
    userInfo: User;
    userDetailSet: (details: UserDetails) => void;
    private viewModel: ProfileAboutViewModel;

    constructor(modalPopupService: ModalPopupService, usersApi: UserApiService) {
        this.viewModel = new ProfileAboutViewModel(usersApi, modalPopupService);
    }

    ngOnInit(): void {

    }

    completeProfile() {
        this.viewModel.completeProfileFor(this.userInfo)
            .subscribe((userDetails) => {
                this.userDetails = userDetails;
                this.userDetailSet(userDetails);
            });
    }

}
