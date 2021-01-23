
import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/model classes/user/User";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {

    @Input() user: User
  constructor(){}


  ngOnInit(): void {}

}
