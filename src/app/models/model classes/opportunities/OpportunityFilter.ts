import {Opportunity} from "./Opportunity";

export class OpportunityFilter {
    searchText = '';
    isFullTime = false;
    isPartTime = false;
    categories: string[] = [];
    grades: number[] = [];
    // Paid / Volunteer
    compensations: string[] = [];

    constructor() {}

    filter(opportunities: Opportunity[]): Opportunity[] {
        return opportunities
            .filter((o) => this.searchText === ''
                ? true
                : o.name.toLowerCase().includes(this.searchText.toLowerCase())
            )
            .filter((o) => {
                if (this.isFullTime && this.isPartTime) {
                    return true;
                }
                if (this.isFullTime) {
                    return o.isFullTime;
                }
                if (this.isPartTime) {
                    return !o.isFullTime;
                }
                return true;
            })
            .filter((o) => this.compensations.length === 0
                ? true
                : this.compensations.includes(o.compensation))
            .filter((o) => {
                return this.categories.length === 0
                    ? true
                    : this.categories.includes(o.category)
            })
            .filter((o) => {
                if (this.grades.length === 0) return true;
                for (const grade of this.grades) {
                    if (o.gradesWanted.includes(grade)) return true;
                }
                return false;
                // return this.grades.every((el) => { // user selected grades
                //     return o.gradesWanted.indexOf(el) !== -1;  // grades specified by opportunity
                // });
            });
    }

    reset() {
        this.searchText = '';
        this.isFullTime = false;
        this.isPartTime = false;
        this.categories = [];
        this.grades = [];
        this.compensations = [];
    }
}
