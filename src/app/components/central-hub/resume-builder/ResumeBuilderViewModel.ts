import {UserApiService} from "../../../services/user-api.service";
import {ResumeService} from "../../../services/central-hub/resume.service";
import {Observable} from "rxjs";
import {Resume} from "../../../models/model classes/central-hub/resume/Resume";
import {take} from "rxjs/operators";

export class ResumeBuilderViewModel {
    constructor(
        private userApi: UserApiService,
        private resumeService: ResumeService
    ) {
        this.userApi.getUserInfo().subscribe(() => {});
    }

    getAllResumes(): Observable<Resume[]> {
        return this.userApi.getAllResumes()
            .pipe(take(1));
    }

    getEmptyResume(): Resume {
        return new Resume(
            this.userApi.currentUser.id, [], [], [],
            [], [], [], [],
            [], [], [], false, false
        );
    }

    saveResumeAsDraft(resume: Resume): Observable<any> {
        console.log(resume);
        const observable = this.isResumeSaved(resume)
            ? this.resumeService.updateResume(resume)
            : this.resumeService.createResume(resume);
        return observable.pipe(take(1));
    }

    private isResumeSaved(resume: Resume): boolean {
        return resume.created !== null;
    }
}
