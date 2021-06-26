import {Component, Input, OnInit} from '@angular/core';
import {expand} from "../../../../../models/model classes/AngularAnimations";
import {ResumeEntity, ResumeExperience} from "../../../../../models/model classes/central-hub/resume/Resume";

@Component({
    selector: 'app-resume-builder-experiences',
    templateUrl: './resume-builder-experiences.component.html',
    animations: [expand]
})
export class ResumeBuilderExperiencesComponent implements OnInit {
    @Input() experiences: ResumeExperience[];
    expanded = false;

    possibleTypes: string[] = [
        'full-time',
        'part-time'
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    addExperience() {
        this.experiences.push(new ResumeExperience(
            '',
            '',
            new ResumeEntity(''),
            '',
            '',
            '',
            [],
            false)
        );
    }

    deleteExperienceAt(index: number) {
        this.experiences.splice(index, 1);
    }

}
