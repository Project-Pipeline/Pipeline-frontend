import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../models/model classes/user/User";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DescriptionDetailPair, UserDetails} from "../../../../models/model classes/user/UserDetails";
import {Address} from "../../../../models/model classes/user/Address";

@Component({
    selector: 'app-entity-user-details-popup',
    templateUrl: './entity-user-details-popup.component.html',
    styleUrls: ['./entity-user-details-popup.component.scss']
})
export class EntityUserDetailsPopupComponent implements OnInit {
    user: User;
    bio: string = '';
    publicId: string = '';
    dateFounded: Date = null;
    links: [string, string][] = [];
    phoneNumbers: [string, string][] = [['', '']];
    additionalInfo: [string, string][] = [];
    address: Address = null;
    private datePipe = new DatePipe('en-US');
    private typeToStringLookup: {[key: number]: string} = {
        3: 'company',
        4: 'community organization',
        5: 'school'
    }

    constructor(private dialog: MatDialogRef<EntityUserDetailsPopupComponent>,
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
            this.datePipe.transform(this.dateFounded, 'yyyy-MM-dd\'T\'HH:mm:ssZ'),
            this.address,
            null,
            null,
            null
        );
        this.dialog.close(userDetails);
    }

    removeSpace(str: string): string {
        return str.replace(' ', '');
    }

    typeToString(): string {
        return this.typeToStringLookup[this.user.type];
    }

    addressSelected(address: Address) {
        this.address  = address;
    }

}
