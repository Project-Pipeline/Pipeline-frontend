import {UserDTO} from "../../user/UserDetails";
import {generateUUID} from "../../../Global";
import {DateRangePickable} from "../../../../shared/ui-components/date-range-picker/DateRangePickable";

export class Resume {
    public user: UserDTO

    constructor(
        userId: string,
        public education: ResumeEducation[] = [],
        public activities: ResumeActivity[] = [],
        public apClasses: string[] = [],
        public publications: ResumePublication[] = [],
        public volunteering: ResumeVolunteering[] = [],
        public experiences: ResumeExperience[] = [],
        public certs: ResumeCertification[] = [],
        public awards: ResumeAward[] = [],
        public interests: string[] = [],
        public testScores: ResumeTestScore[] = [],
        public published: boolean = false,
        public isActive: boolean = false,
        public tag?: string,
        public modified?: Date,
        public created?: Date,
        public id: string = generateUUID()
    ) {
        this.user = new UserDTO(userId);
    }
}

export class ResumeEntity {
    constructor(
        public name: string,
        public id?: string
    ) {
    }
}

export class ResumeEducation implements DateRangePickable {
    constructor(
        public school: ResumeEntity,
        public degree: string,
        public focus: string,
        public startDate: string,
        public endDate: string,
        public current: boolean
    ) {
    }
}

export class ResumeActivity  implements DateRangePickable {
    constructor(
        public type: string,
        public name: string,
        public position: string,
        public startDate: string,
        public endDate: string,
        public descriptions: string[],
        public current: boolean
    ) {
    }
}

export class ResumePublication {
    constructor(
        public type: string,
        public title: string,
        public content: string
    ) {
    }
}

export class ResumeVolunteering implements DateRangePickable {
    constructor(
        public role: string,
        public cause: string,
        public entity: ResumeEntity,
        public location: string,
        public startDate: string,
        public endDate: string,
        public descriptions: string[],
        public current: boolean,
        public hours?: number
    ) {
    }
}

export class ResumeExperience {
    constructor(
        public role: string,
        public type: string,
        public entity: ResumeEntity,
        public location: string,
        public startDate: string,
        public endDate: string,
        public descriptions: string[],
        public current: boolean,
    ) {
    }
}

export class ResumeCertification {
    constructor(
        public name: string,
        public issued: string,
        public issuer: string,
        public url: string
    ) {
    }
}

export class ResumeAward {
    constructor(
        public name: string,
        public date: string
    ) {
    }
}

export class ResumeTestScore {
    constructor(
        public type: string,
        public score: number
    ) {
    }
}


