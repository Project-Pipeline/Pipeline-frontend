import {UserApiService} from "../../../services/user-api.service";
import {Router} from "@angular/router";
import {ModalPopupService} from "../modal-popup.service";
import {PostsService} from "../../../services/posts.service";
import {AddPostPopupComponent} from "../news-center/add-post-popup/add-post-popup.component";
import {DialogSize} from "../../../models/model classes/DialogSize";
import {catchError, filter, map, mergeMap, share} from "rxjs/operators";
import {Post} from "../../../models/model classes/posts/Post";
import {empty, Observable, of} from "rxjs";
import {User} from "../../../models/model classes/user/User";
import {PageData} from "../../../models/model classes/common/PageData";
import {UserDetails} from "../../../models/model classes/user/UserDetails";
import {entityUserTypes, individualUserTypes} from "../../../models/BusinessConstants";
import {IndividualUserDetailsPopupComponent} from "./individual-user-details-popup/individual-user-details-popup.component";
import {EntityUserDetailsPopupComponent} from "./entity-user-details-popup/entity-user-details-popup.component";
import {handleJWTError} from "../../../models/Global";

export class ProfileViewModel {

    noUserDetails: Observable<any>;
    hasUserDetails: Observable<UserDetails>;

    private isIndividual = false;
    private isEntity = false;
    private typeToStringLookup: {[key: number]: string} = {
        0: 'student',
        1: 'teacher',
        2: 'working professional',
        3: 'company',
        4: 'community organization',
        5: 'school'
    };

    constructor(
        public usersApi: UserApiService,
        public router: Router,
        public modalPopupService: ModalPopupService,
        public postsService: PostsService
    ) {
        const getUserDetails = this.usersApi.getUserDetails().pipe(share());

        this.noUserDetails = getUserDetails.pipe(filter((details) => details.length === 0));
        this.hasUserDetails = getUserDetails
            .pipe(filter((details) => details.length !== 0))
            .pipe(map((details) => details[0]));
    }

    /// USER ///

    getUser(): Observable<GetUserResult> {
        return this.usersApi.getUserInfo()
            .pipe(catchError((e) => handleJWTError(e, this.router)))
            .pipe(mergeMap((user) => {
                this.prepareUserType(user);
                return of(new GetUserResult(
                    user,
                    this.isIndividual,
                    this.isEntity
                ));
            }));
    }

    completeProfileFor(userInfo: User): Observable<UserDetails> {
        let getUserDetails: Observable<any> = empty();
        if (individualUserTypes.includes(userInfo.type)) { // Individual user
            getUserDetails = this.modalPopupService.openDialogComponent(
                IndividualUserDetailsPopupComponent,
                userInfo
            );
        } else if (entityUserTypes.includes(userInfo.type)) { // an entity
            getUserDetails = this.modalPopupService.openDialogComponent(
                EntityUserDetailsPopupComponent,
                userInfo
            );
        }
        return getUserDetails
            .pipe(filter((result) => result != null))
            .pipe(mergeMap((result) => {
                const userDetails = result as UserDetails;
                return this.usersApi.setUserDetails(result)
                    .pipe(map(() => userDetails));
            }))
    }

    typeToStringFor(userInfo: User): string {
        return this.typeToStringLookup[userInfo.type];
    }

    prepareUserType(userInfo: User) {
        this.isIndividual = individualUserTypes.includes(userInfo.type);
        this.isEntity = entityUserTypes.includes(userInfo.type);
    }

    /// POSTS ///

    getPosts(user: User): Observable<PageData<Post>> {
        return this.usersApi.getPosts(user, 1);
    }

    addPost(): Observable<Post> {
        return this.modalPopupService.openDialogComponent(
            AddPostPopupComponent,
            null,
            DialogSize.mediumLarge
        )
            .pipe(filter((res) => res != null))
            .pipe(mergeMap((p) => {
                const post = p as Post;
                const category = this.usersApi.getCategoryForPost();
                return this.postsService
                    .createCategory(category)
                    .pipe(mergeMap(() => this.postsService.createPost(post)))
                    .pipe(map(() => post));
            }));
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
