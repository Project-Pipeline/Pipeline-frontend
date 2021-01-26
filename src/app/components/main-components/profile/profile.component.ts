import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {User} from "../../../models/model classes/user/User";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {handleJWTError} from "../../../models/Global";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    userInfo: User
    pageReady = false

    constructor(private usersApi: UserApiService, private router: Router) {
    }

    ngOnInit(): void {
        this.usersApi.getUserInfo()
            .pipe(catchError((e) => handleJWTError(e, this.router)))
            .subscribe((user) => {
                this.userInfo = user;
                this.pageReady = true;
            });
    }

}
