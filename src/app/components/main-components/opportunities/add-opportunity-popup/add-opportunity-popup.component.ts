import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Address} from "../../../../models/model classes/user/Address";
import {UserAndDetailCombo} from "../../../../models/model classes/user/UserAndDetailCombo";
import {Opportunity} from "../../../../models/model classes/opportunities/Opportunity";
import {allowedOpportunityGradeLevels, opportunityCategories} from "../../../../models/BusinessConstants";
import {dateAsUnixTimeStamp} from "../../../../models/Global";

@Component({
    selector: 'app-add-opportunity-popup',
    templateUrl: './add-opportunity-popup.component.html',
    styleUrls: ['./add-opportunity-popup.component.scss']
})
export class AddOpportunityPopupComponent implements OnInit {
    possibleCompensations: string[] = ['Paid', 'Volunteer'];
    possibleCategories = opportunityCategories;
    allowedGrades: number[] = allowedOpportunityGradeLevels;
    // vars below are bound to view
    gradesChecked: boolean[] = [];
    name: string = '';
    fullTimeCheckedBool = false;
    partTimeCheckedBool = false;
    overview: string = '';
    responsibilities: [string][] = [[""]];
    qualifications: [string][] = [[""]];
    compensation: string = '';
    category: string = '';
    differentLocation = false;
    addressForDiffLocation: Address = null;
    dueDate: Date;

    constructor(private dialog: MatDialogRef<AddOpportunityPopupComponent>,
                @Inject(MAT_DIALOG_DATA) public argument: UserAndDetailCombo) {
        this.gradesChecked = this.allowedGrades.map(() => false);
    }

    ngOnInit(): void {
    }

    close() {
        this.dialog.close(null);
    }

    closeWithResult() {
        this.dialog.close(
            new Opportunity(
                this.name,
                `${this.argument.user.givenName} ${this.argument.user.familyName}`,
                this.overview,
                this.qualifications.map((q) => q[0]),
                this.responsibilities.map((r) => r[0]),
                this.compensation,
                this.fullTimeCheckedBool,
                this.addressForDiffLocation == null
                    ? this.argument.userDetails.address
                    : this.addressForDiffLocation,
                this.category,
                dateAsUnixTimeStamp(this.dueDate),
                this.allowedGrades.filter((val, index) => this.gradesChecked[index]),
                this.argument.user.id,
            )
        )
    }

    fullTimeChecked(checked: boolean) {
        this.fullTimeCheckedBool = checked;
        if (checked) this.partTimeCheckedBool = false;
    }

    partTimeChecked(checked: boolean) {
        this.partTimeCheckedBool = checked;
        if (checked) this.fullTimeCheckedBool = false;
    }

    differentLocationChecked(checked: boolean) {
        this.differentLocation = checked;
    }

    differentLocationFound(address: Address) {
        this.addressForDiffLocation = address;
    }

}
