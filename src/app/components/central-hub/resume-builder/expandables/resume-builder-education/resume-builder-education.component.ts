import {Component, Input, OnInit} from '@angular/core';
import {expand} from "../../../../../models/model classes/AngularAnimations";
import {ResumeEducation, ResumeEntity} from "../../../../../models/model classes/central-hub/resume/Resume";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
    selector: 'app-resume-builder-education',
    templateUrl: './resume-builder-education.component.html',
    styleUrls: ['./resume-builder-education.component.scss'],
    animations: [expand]
})
export class ResumeBuilderEducationComponent implements OnInit {
    @Input() educations: ResumeEducation[] = [
        new ResumeEducation(
            new ResumeEntity("newTown", ""),
            "High school diploma",
            "engineering",
            "2013-03-29T12:20:35.093-05:00",
            "2016-03-29T12:20:35.093-05:00",
            true
        )
    ];
    expanded = true;

    constructor() {
    }

    ngOnInit(): void {

    }

    onCollapse() {
        this.expanded = false;
    }

    getSampleEdu(): ResumeEducation {
        return new ResumeEducation(
            new ResumeEntity("", null), "", "",
            "", "", false
        );
    }

    addEducation() {
        this.educations.push(this.getSampleEdu());
    }

    deleteEducationAt(index: number) {
        this.educations.splice(index, 1);
    }

    currentCheckBoxChecked(event: MatCheckboxChange, edu: ResumeEducation) {
        edu.current = event.checked;
        if (event.checked) {
            edu.endDate = null;
        }
    }



}
