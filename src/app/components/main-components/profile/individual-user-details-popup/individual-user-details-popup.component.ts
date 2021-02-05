import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../models/model classes/user/User";
import {DescriptionDetailPair, UserDetails} from "../../../../models/model classes/user/UserDetails";

@Component({
    selector: 'app-individual-user-details-popup',
    templateUrl: './individual-user-details-popup.component.html',
    styleUrls: ['./individual-user-details-popup.component.scss']
})
export class IndividualUserDetailsPopupComponent implements OnInit {
    user: User;
    bio: string = '';
    publicId: string = '';
    dob: Date = null;
    genderList: string[] = ['Male', 'Female', 'Prefer to not tell'];
    selectedGender: string;
    profession = '';
    links: [string, string][] = [];
    phoneNumbers: [string, string][] = [['', '']];
    additionalInfo: [string, string][] = [];

    constructor(private dialog: MatDialogRef<IndividualUserDetailsPopupComponent>,
                @Inject(MAT_DIALOG_DATA) public argument: User) {
        this.user = argument;
    }

    ngOnInit(): void {
        this.publicId = `${this.removeSpace(this.user.givenName)}${this.removeSpace(this.user.familyName)}`.toLowerCase()
    }

    close() {
        this.dialog.close(null);
    }

    closeWithInformation() {
        const userDetails = new UserDetails(
            this.user.id,
            this.links.map((l) => new DescriptionDetailPair(l[0], l[1])),
            this.phoneNumbers.map((l) => new DescriptionDetailPair(l[0], l[1])),
            this.publicId,
            this.additionalInfo.map((l) => new DescriptionDetailPair(l[0], l[1])),
            null,
            this.bio,
            null,
            null,
            null,
            this.dob,
            this.genderList.indexOf(this.selectedGender),
            this.profession
        );
        this.dialog.close(userDetails);
    }

    removeSpace(str: string): string {
        return str.replace(' ', '');
    }


    addLinks() {
        this.links.push(['', '']);
    }

    addPhoneNumbers() {
        this.phoneNumbers.push(['', '']);
    }

    addAdditionalInfo() {
        this.additionalInfo.push(['', '']);
    }



}
