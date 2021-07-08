import {Component, Input, OnInit} from '@angular/core';
import {expand} from "../../../../../models/model classes/AngularAnimations";
import {ResumeCertification} from "../../../../../models/model classes/central-hub/resume/Resume";

@Component({
    selector: 'app-resume-builder-certifications',
    templateUrl: './resume-builder-certifications.component.html',
    animations: [expand]
})
export class ResumeBuilderCertificationsComponent implements OnInit {
    expanded = false;
    @Input() certifications: ResumeCertification[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    addCertification() {
        this.certifications.push(
            new ResumeCertification('', '', '', null)
        );
    }

    deleteCertificationAt(index: number) {
        this.certifications.splice(index, 1);
    }

}
