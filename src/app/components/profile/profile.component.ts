import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../services/user-api.service";
import {User} from "../../models/model classes/user/User";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userInfo: User

    constructor(private usersApi: UserApiService) {
    }

    ngOnInit(): void {
        this.usersApi.getUserInfo()
            .subscribe((user) => this.userInfo = user);
    }

}
