import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {UserApiService} from "../../../services/user-api.service";
import {User} from "../../../models/model classes/user/User";
import {Router} from "@angular/router";
import {UserDetails} from "../../../models/model classes/user/UserDetails";
import {ModalPopupService} from "../modal-popup.service";
import {PostsService} from "../../../services/posts.service";
import {Post} from "../../../models/model classes/posts/Post";
import {ProfileViewModel} from "./ProfileViewModel";
import {Title} from "@angular/platform-browser";

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
    tabs: string[] = [];
    tabMappings: boolean[] = [];
    @ViewChild('profileTabContent', { read: ViewContainerRef }) profileTabContent: ViewContainerRef;

    constructor(
        public usersApi: UserApiService,
        public router: Router,
        public modalPopupService: ModalPopupService,
        public postsService: PostsService,
        public title: Title,
        public cfr: ComponentFactoryResolver
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
            setTimeout(() => this.injectComponentForTab(this.tabs[0]), 100)
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

    }

    tabSelected(event: [string, number]) {
        this.injectComponentForTab(event[0]);
    }

    private injectComponentForTab(tab: string) {
        const component = this.viewModel.tabIdToComponent[tab];
        const componentFactory = this.cfr.resolveComponentFactory(component);
        this.profileTabContent.clear();
        this.profileTabContent.createComponent(componentFactory).instance;
    }
}
