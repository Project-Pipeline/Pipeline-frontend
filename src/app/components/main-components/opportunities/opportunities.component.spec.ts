import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OpportunitiesComponent} from './opportunities.component';
import {CurrentLocationMarkerData} from '../../../models/model classes/opportunities/OpportunityMarkerData';
import {OpportunityFilter} from '../../../models/model classes/opportunities/OpportunityFilter';

describe('OpportunitiesComponent', () => {
    let component: OpportunitiesComponent;
    const filter: OpportunityFilter = new OpportunityFilter();
    let fixture: ComponentFixture<OpportunitiesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpportunitiesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OpportunitiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have viewModel initiated', () => {
        expect(component.viewModel).toBeTruthy();
    });

    // ngOnInit(): void {
    //     this.viewModel.getUserLocation()
    //         .subscribe((latlng) => {
    //             this.center = latlng;
    //             this.centerMarker = new CurrentLocationMarkerData(latlng);
    //             this.updateCenterLocation(latlng);
    //         });

    it('check get viewer port height', () => {
        expect(component.getViewportHeight).toEqual(component.viewportHeight);
    });

    it('check get viewer port height for side bar', () => {
        expect(component.getViewportHeight).toEqual(component.viewportHeight);
    });
    //
    // expandRightSide() { this.setRightSideExpanded(true); }
    //
    // collapseRightSide() { this.setRightSideExpanded(false); }
    it('check expand right side', () => {
        component.expandRightSide();
        expect(component.rightSideExpanded).toBeTruthy();
    });

    it('check collapse right side', () => {
        component.collapseRightSide();
        expect(component.rightSideExpanded).toBeFalse();
    });

});
