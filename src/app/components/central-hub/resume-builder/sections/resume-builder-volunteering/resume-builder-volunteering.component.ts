import {Component, Input, OnInit} from '@angular/core';
import {ResumeEntity, ResumeVolunteering} from "../../../../../models/model classes/central-hub/resume/Resume";
import {expand} from "../../../../../models/model classes/AngularAnimations";

@Component({
    selector: 'app-resume-builder-volunteering',
    templateUrl: './resume-builder-volunteering.component.html',
    styleUrls: ['./resume-builder-volunteering.component.scss'],
    animations: [expand]
})
export class ResumeBuilderVolunteeringComponent implements OnInit {
    @Input() volunteeringActivities: ResumeVolunteering[] = [];
    expanded = false;
    constructor() {
    }

    causes = [
        'Animal Welfare', 'Arts and Culture', 'Children',
        'Environment', 'Education', 'Health', 'Human Rights',
        'Humanitarian Relief', 'Politics', 'Technology',
        'Social Services', 'Other'
    ];

    ngOnInit(): void {
    }

    addVolunteering() {
        this.volunteeringActivities.push(new ResumeVolunteering(
            '', '', new ResumeEntity(''), '',
            '', '', [], false
        ))
    }

    deleteVolunteeringAt(index: number) {
        this.volunteeringActivities.splice(index, 1);
    }
}
