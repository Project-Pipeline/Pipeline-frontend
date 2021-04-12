import {Component, Input, OnInit} from '@angular/core';
import {ResumePublication} from "../../../../../models/model classes/central-hub/resume/Resume";
import {expand} from "../../../../../models/model classes/AngularAnimations";

@Component({
    selector: 'app-resume-builder-publications',
    templateUrl: './resume-builder-publications.component.html',
    animations: [expand]
})
export class ResumeBuilderPublicationsComponent implements OnInit {
    @Input() publications: ResumePublication[];
    expanded = false;

    possibleTypes: string[] = [
        "Poem",
        "School Newspaper Article",
        "Essay",
        "Research Paper",
        "Other"
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    addPublication() {
        this.publications.push(new ResumePublication('', '', ''));
    }

    deletePublicationAt(index: number) {
        this.publications.splice(index, 1);
    }
}
