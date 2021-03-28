import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OpportunityFilter} from "../../../models/model classes/opportunities/OpportunityFilter";
import {allowedOpportunityGradeLevels, opportunityCategories} from "../../../models/BusinessConstants";
import {OpportunitiesFilterBarViewModel} from "./OpportunitiesFilterBarViewModel";

@Component({
    selector: 'app-opportunities-filter-bar',
    templateUrl: './opportunities-filter-bar.component.html',
    styleUrls: ['./opportunities-filter-bar.component.scss']
})
export class OpportunitiesFilterBarComponent implements OnInit {
    @Output() filterUpdated: EventEmitter<OpportunityFilter> = new EventEmitter();
    gradeLevels = allowedOpportunityGradeLevels;
    categories = opportunityCategories;
    showingOverlays = [false, false, false, false];
    viewModel = new OpportunitiesFilterBarViewModel();

    //bindings
    searchText = '';
    paid = false;
    volunteer = false;
    partTime = false;
    fullTime = false;
    checkedCategories: boolean[] = [];
    checkedGradeLevels: boolean[] = [];

    constructor() {
        this.checkedCategories = this.categories.map(() => false);
        this.checkedGradeLevels = this.gradeLevels.map(() => false);
    }

    ngOnInit(): void {

    }

    toggleOverlayAt(index: number) {
        this.showingOverlays = this.showingOverlays.map((value, i) => {
            return i === index ? !value : false;
        });
    }

    saveCategories(i: number) {
        this.toggleOverlayAt(i);
        this.viewModel.applyCategoriesFilter(this.checkedCategories);
        this.updateFilter();
    }

    saveSchedule(i: number) {
        this.toggleOverlayAt(i);
        this.viewModel.applySchedulingFilter(this.fullTime, this.partTime);
        this.updateFilter();
    }

    saveCompensation(i: number) {
        this.toggleOverlayAt(i);
        this.viewModel.applyCompensationFilter(this.paid, this.volunteer);
        this.updateFilter();
    }

    saveGrades(i: number) {
        this.toggleOverlayAt(i);
        this.viewModel.applyGradesFilter(this.checkedGradeLevels);
        this.updateFilter();
    }

    applySearchText() {
        this.viewModel.applyTextFilter(this.searchText);
        this.updateFilter();
    }

    reset() {
        this.paid = false;
        this.volunteer = false;
        this.partTime = false;
        this.fullTime = false;
        this.checkedCategories = [];
        this.checkedGradeLevels = [];
        this.viewModel.reset();
        this.searchText = '';
        this.updateFilter();
    }

    private updateFilter() {
        this.filterUpdated.emit(this.viewModel.getFilter());
    }

}
