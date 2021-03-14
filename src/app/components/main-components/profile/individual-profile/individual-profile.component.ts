import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {UserApiService} from "../../../../services/user-api.service";
import {Router} from "@angular/router";
import {ProfileComponent} from "../profile.component";
import {ModalPopupService} from "../../modal-popup.service";
import {PostsService} from "../../../../services/posts.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-individual-profile',
    templateUrl: './individual-profile.component.html',
    styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent extends ProfileComponent implements OnInit {
    constructor(
        public usersApi: UserApiService,
        public router: Router,
        public dialogService: ModalPopupService,
        public postsService: PostsService,
        public title: Title,
        public cfr: ComponentFactoryResolver)
    {
        super(usersApi, router, dialogService, postsService, title, cfr);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }


}
