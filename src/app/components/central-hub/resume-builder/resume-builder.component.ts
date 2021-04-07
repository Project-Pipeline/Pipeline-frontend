import {Component, OnInit} from '@angular/core';
import {CentralHubBaseComponent} from "../central-hub-base/central-hub-base.component";
import {Resume} from "../../../models/model classes/central-hub/resume/Resume";
import {ResumeBuilderViewModel} from "./ResumeBuilderViewModel";
import {UserApiService} from "../../../services/user-api.service";
import {ResumeService} from "../../../services/central-hub/resume.service";

@Component({
    selector: 'app-resume-builder',
    templateUrl: './resume-builder.component.html',
    styleUrls: ['./resume-builder.component.scss']
})
export class ResumeBuilderComponent extends CentralHubBaseComponent implements OnInit {
    heightForList: string = '0px';
    resumes: Resume[] = [];
    viewModel: ResumeBuilderViewModel;
    currentResume: Resume = null;
    currentResumeTitle = '';

    constructor(userApi: UserApiService, resumeService: ResumeService) {
        super();
        this.viewModel = new ResumeBuilderViewModel(userApi, resumeService);
    }

    ngOnInit(): void {
        this.viewModel.getAllResumes()
            .subscribe((resumes) => this.resumes = resumes);
    }

    addResume() {
        const newResume = this.viewModel.getEmptyResume();
        this.currentResumeTitle = `Resume ${this.resumes.length + 1}`;
        this.resumes.push(newResume);
        this.currentResume = newResume;
    }

    selectResume(resume: Resume, index: number) {
        this.currentResume = resume;
        this.currentResumeTitle = `Resume ${index + 1}`;
    }

    heightChanged(height: number, heightInString: string) {
        super.heightChanged(height, heightInString);
        this.heightForList = `${height - 120}px`
    }

    saveAsDraft() {
        this.viewModel.saveResumeAsDraft(this.currentResume)
            .subscribe(() => {});
    }

    getModifiedDate(resume: Resume): Date {
        return new Date(resume.modified);
    }

}
