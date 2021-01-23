import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/model classes/user/User";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  @Input() user: User
  constructor(private breakpointObserver: BreakpointObserver) {

  }
}
