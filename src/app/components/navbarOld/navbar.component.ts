import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/model classes/user/User";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
    @Input() user: User
    constructor() {
    }

    ngOnInit(): void {
    }

}
