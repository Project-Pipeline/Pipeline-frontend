import {Component, Input, OnInit} from '@angular/core';
import {ResumeActivity} from "../../../../../models/model classes/central-hub/resume/Resume";
import {expand} from "../../../../../models/model classes/AngularAnimations";

@Component({
    selector: 'app-resume-builder-activities',
    templateUrl: './resume-builder-activities.component.html',
    animations: [expand]
})
export class ResumeBuilderActivitiesComponent implements OnInit {
    @Input() activities: ResumeActivity[] = [];
    expanded = false;
    descriptions: [string][];
    constructor() {
    }

    ngOnInit(): void {
    }

    addActivity() {
        this.activities.push(new ResumeActivity(
            '', '', '', '',
            '', [''], false
        ));
    }

    deleteActivityAt(index: number) {
        this.activities.splice(index, 1);
    }
}
