import {UserApiService} from "../../../services/user-api.service";
import {User} from "../../../models/model classes/user/User";
import {empty, Observable} from "rxjs";
import {UserDetails} from "../../../models/model classes/user/UserDetails";
import {entityUserTypes, individualUserTypes} from "../../../models/BusinessConstants";
import {IndividualUserDetailsPopupComponent} from "../individual-user-details-popup/individual-user-details-popup.component";
import {EntityUserDetailsPopupComponent} from "../entity-user-details-popup/entity-user-details-popup.component";
import {filter, map, mergeMap, take} from "rxjs/operators";
import {ModalPopupService} from "../../../shared/services/modal-popup.service";

export class ProfileAboutViewModel {
    constructor(private usersApi: UserApiService, private modalPopupService: ModalPopupService) {
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
            .pipe(take(1));
    }
}
