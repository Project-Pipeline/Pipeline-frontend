import {OpportunityFilter} from "../../../models/model classes/opportunities/OpportunityFilter";
import {allowedOpportunityGradeLevels, opportunityCategories} from "../../../models/BusinessConstants";

export class OpportunitiesFilterBarViewModel {
    private filter = new OpportunityFilter();

    constructor() {}

    applySchedulingFilter(fullTime: boolean, partTime: boolean) {
        this.filter.isFullTime = fullTime;
        this.filter.isPartTime = partTime;
    }

    applyCategoriesFilter(checked: boolean[]) {
        this.filter.categories = opportunityCategories.filter((cat, i) => checked[i]);
    }

    applyCompensationFilter(paid: boolean, volunteer: boolean) {
        let results: string[] = [];
        if (paid) results.push('Paid');
        if (volunteer) results.push('Volunteer');
        this.filter.compensations = results;
    }

    applyGradesFilter(checked: boolean[]) {
        this.filter.grades = allowedOpportunityGradeLevels.filter((grade, i) => checked[i]);
    }

    applyTextFilter(text: string) {
        this.filter.searchText = text;
    }

    reset() {
        this.filter.reset();
    }

    getFilter(): OpportunityFilter {
        return this.filter;
    }
}
