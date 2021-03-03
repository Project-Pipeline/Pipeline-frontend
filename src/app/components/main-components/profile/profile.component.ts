import {Component, OnInit} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {User} from "../../../models/model classes/user/User";
import {Router} from "@angular/router";
import {UserDetails} from "../../../models/model classes/user/UserDetails";
import {ModalPopupService} from "../modal-popup.service";
import {PostsService} from "../../../services/posts.service";
import {Post} from "../../../models/model classes/posts/Post";
import {ProfileViewModel} from "./ProfileViewModel";

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
    posts: Post[] = [];
    viewModel: ProfileViewModel;

    constructor(
        public usersApi: UserApiService,
        public router: Router,
        public modalPopupService: ModalPopupService,
        public postsService: PostsService
    ) {
        this.viewModel = new ProfileViewModel(usersApi, router, modalPopupService, postsService);
    }

    ngOnInit(): void {
        this.viewModel.getUser().subscribe((result) => {
            this.userInfo = result.user;
            this.isIndividual = result.isIndividual;
            this.isEntity = result.isEntity;
            this.pageReady = true;
            // get posts
            this.viewModel.getPosts(this.userInfo)
                .subscribe((posts) => this.posts = posts.items);
        });

        // user details dne - create user details
       this.viewModel.noUserDetails
            .subscribe(() => this.shouldCompleteUserDetails = true);

        // user detail exists
        this.viewModel.hasUserDetails
            .subscribe((detail) => this.userDetails = detail);
    }

    completeProfile() {
        this.viewModel.completeProfileFor(this.userInfo)
            .subscribe((userDetails) => this.userDetails = userDetails);
    }

    typeToString(): string {
        return this.viewModel.typeToStringFor(this.userInfo);
    }

    addPost() {
        this.viewModel.addPost()
            .subscribe((post) => this.posts.push(post));
    }
}
