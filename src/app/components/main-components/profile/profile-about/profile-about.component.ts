import { Component, OnInit } from '@angular/core';
import {ProfileTabComponent} from "../ProfileTabComponent";
import {UserDetails} from "../../../../models/model classes/user/UserDetails";
import {User} from "../../../../models/model classes/user/User";

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit, ProfileTabComponent {
    userDetails: UserDetails;
    userInfo: User;

  constructor() { }

  ngOnInit(): void {
  }

}
