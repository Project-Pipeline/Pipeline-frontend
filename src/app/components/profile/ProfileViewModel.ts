import {UserApiService} from "../../services/user-api.service";
import {Router} from "@angular/router";
import {ModalPopupService} from "../../shared/services/modal-popup.service";
import {PostsService} from "../../services/posts.service";
import {filter, map, mergeMap, share, take} from "rxjs/operators";
import {Post} from "../../models/model classes/posts/Post";
import {Observable, of} from "rxjs";
import {User} from "../../models/model classes/user/User";
import {PageData} from "../../models/model classes/common/PageData";
import {UserDetails} from "../../models/model classes/user/UserDetails";
import {
    entityUserTypes,
    individualUserTypes,
    postCategoryLookUp,
    profileTabsForUsersWithType,
    profileTabTitles
} from "../../models/BusinessConstants";
import {ComponentType} from "@angular/cdk/overlay";
import {ProfilePostsComponent} from "./profile-posts/profile-posts.component";
import {ProfileAboutComponent} from "./profile-about/profile-about.component";
import {ProfileOpportunitiesComponent} from "./profile-opportunities/profile-opportunities.component";
import {ProfileTabComponent} from "./ProfileTabComponent";

export class ProfileViewModel {

    noUserDetails: Observable<any>;
    hasUserDetails: Observable<UserDetails>;

    private isIndividual = false;
    private isEntity = false;
    private typeToStringLookup: {[key: number]: string} = postCategoryLookUp;

    tabIdToComponent: {[key: string]: ComponentType<ProfileTabComponent> } = {
        About: ProfileAboutComponent,
        Posts: ProfilePostsComponent,
        Opportunities: ProfileOpportunitiesComponent
    }

    constructor(
        public usersApi: UserApiService,
        public router: Router,
        public modalPopupService: ModalPopupService,
        public postsService: PostsService
    ) {
        const getUserDetails = this.usersApi.getUserDetails().pipe(share());

        this.noUserDetails = getUserDetails
            .pipe(filter((details) => details.length === 0))
            .pipe(take(1));

        this.hasUserDetails = getUserDetails
            .pipe(filter((details) => details.length !== 0))
            .pipe(map((details) => details[0]))
            .pipe(take(1));
    }

    /// USER ///

    getUser(): Observable<GetUserResult> {
        return this.usersApi.getUserInfo()
            .pipe(mergeMap((user) => {
                this.prepareUserType(user);
                return of(new GetUserResult(
                    user,
                    this.isIndividual,
                    this.isEntity
                ));
            }))
            .pipe(take(1));
    }

    typeToStringFor(userInfo: User): string {
        return this.typeToStringLookup[userInfo.type];
    }

    prepareUserType(userInfo: User) {
        this.isIndividual = individualUserTypes.includes(userInfo.type);
        this.isEntity = entityUserTypes.includes(userInfo.type);
    }

    userToTabTitles(user: User): string[] {
        return profileTabsForUsersWithType[user.type].map((t) => profileTabTitles[t]);
    }

    userToTabMappings(user: User): boolean[] {
        let mappings = profileTabsForUsersWithType[user.type].map(() => false);
        mappings[0] = true;
        return mappings;
    }

    /// POSTS ///

    getPosts(user: User): Observable<PageData<Post>> {
        return this.usersApi.getPosts(user, 1)
            .pipe(take(1));
    }

    addPost(): Observable<Post> {
        return this.postsService.addPostWithPopup(
            this.modalPopupService,
            this.usersApi
        )
            .pipe(map((usersAndPosts) => usersAndPosts.posts[0]))
            .pipe(take(1));
    }
}

class GetUserResult {
    constructor(
        public user: User,
        public isIndividual: boolean,
        public isEntity: boolean
    ) {
    }
}
