import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {UserApiService} from "../../services/user-api.service";
import {User} from "../../models/model classes/user/User";
import {Router} from "@angular/router";
import {UserDetails} from "../../models/model classes/user/UserDetails";
import {ModalPopupService} from "../../shared/services/modal-popup.service";
import {PostsService} from "../../services/posts.service";
import {Post} from "../../models/model classes/posts/Post";
import {ProfileViewModel} from "./ProfileViewModel";
import {Title} from "@angular/platform-browser";
import {ProfileTabComponent} from "./ProfileTabComponent";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @ViewChild('profileTabContent', { read: ViewContainerRef }) profileTabContent: ViewContainerRef;
    userInfo: User
    userDetails: UserDetails = null;
    pageReady = false
    isIndividual = false;
    isEntity = false;
    posts: Post[] = [];
    viewModel: ProfileViewModel;
    tabs: string[] = [];
    tabMappings: boolean[] = [];

    constructor(
        usersApi: UserApiService,
        router: Router,
        modalPopupService: ModalPopupService,
        postsService: PostsService,
        private title: Title,
        private cfr: ComponentFactoryResolver
    ) {
        this.viewModel = new ProfileViewModel(usersApi, router, modalPopupService, postsService);
        this.title.setTitle('Profile');
    }

    ngOnInit(): void {
        this.viewModel.getUser().subscribe((result) => {
            this.userInfo = result.user;
            this.isIndividual = result.isIndividual;
            this.isEntity = result.isEntity;
            this.pageReady = true;
            this.tabMappings = this.viewModel.userToTabMappings(result.user);
            this.tabs = this.viewModel.userToTabTitles(result.user);
            // user details dne - create user details
            this.viewModel.noUserDetails
                .subscribe(() => {
                    this.injectComponentWithDelay(this.tabs[0], result.user, null);
                });

            // user detail exists
            this.viewModel.hasUserDetails
                .subscribe((detail) => {
                    this.userDetails = detail;
                    this.injectComponentWithDelay(this.tabs[0], result.user, detail);
                });
        });
    }

    typeToString(): string {
        return this.viewModel.typeToStringFor(this.userInfo);
    }

    private injectComponentWithDelay(tab: string, user: User, userDetails: UserDetails) {
        setTimeout(
            () => this.injectComponentForTab(tab, user, userDetails),
            100
        );
    }

    tabSelected(event: [string, number]) {
        this.injectComponentForTab(event[0], this.userInfo, this.userDetails);
    }

    private injectComponentForTab(tab: string, user: User, userDetails: UserDetails) {
        const component = this.viewModel.tabIdToComponent[tab];
        const componentFactory = this.cfr.resolveComponentFactory(component);
        this.profileTabContent.clear();
        const tabComponent = <ProfileTabComponent>this.profileTabContent.createComponent(componentFactory).instance;
        tabComponent.userInfo = user;
        tabComponent.userDetails = userDetails;
        tabComponent.userDetailSet = (details) => this.userDetails = details;
    }
}
