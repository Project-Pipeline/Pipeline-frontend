import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MapsService} from "../../../services/maps.service";
import {expandRightPanel, OpportunitiesViewModel, rightPanelFade} from "./OpportunitiesViewModel";
import {OpportunitiesService} from "../../../services/opportunities.service";
import {Opportunity} from "../../../models/model classes/opportunities/Opportunity";
import {interval} from "rxjs";
import {catchError, debounce, switchMap} from "rxjs/operators";
import {LatLng} from "../../../models/model classes/maps/GeocodingResponse";
import {GoogleMap} from "@angular/google-maps";
import {
    CurrentLocationMarkerData,
    OpportunityMarkerData
} from "../../../models/model classes/opportunities/OpportunityMarkerData";
import {OpportunityFilter} from "../../../models/model classes/opportunities/OpportunityFilter";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-opportunities',
    templateUrl: './opportunities.component.html',
    styleUrls: ['./opportunities.component.scss'],
    animations: [expandRightPanel, rightPanelFade]
})
export class OpportunitiesComponent implements OnInit, AfterViewInit {
    // view styling
    @ViewChild('googleMap') map: GoogleMap
    viewportHeight: number = null;
    viewportHeightString: string = null;
    viewportHeightStringSidebar: string = null;
    mapOptions: google.maps.MapOptions = null;
    viewModel: OpportunitiesViewModel;
    opportunityToShowDetail: Opportunity;
    // data bindings
    center: LatLng;
    markers: OpportunityMarkerData[] = [];
    centerMarker: CurrentLocationMarkerData = null;
    opportunities: Opportunity[] = [];
    filteredOpportunities: Opportunity[] = [];
    rightSideExpanded = false;
    rightSideComponentReplaced = false;

    constructor(
        private mapsService: MapsService,
        private opportunitiesService: OpportunitiesService,
        private title: Title
    ) {
        this.viewportHeightString = this.getViewportHeight();
        this.viewportHeightStringSidebar = this.getViewportHeightForSideBar();
        this.viewModel = new OpportunitiesViewModel(mapsService, opportunitiesService);
        this.mapOptions = this.viewModel.mapOptions;
        this.title.setTitle('Opportunities');
    }

    ngOnInit(): void {
        this.viewModel.getUserLocation()
            .subscribe((latlng) => {
                this.center = latlng;
                this.centerMarker = new CurrentLocationMarkerData(latlng);
                this.updateCenterLocation(latlng);
            });

        this.viewModel.centerLocationUpdater
            .pipe(switchMap((latLng) => this.viewModel.getOpportunitiesCenteredOn(latLng)))
            .subscribe(([opportunities, filteredOpportunities, markers]) => {
                this.opportunities = opportunities;
                this.filteredOpportunities = filteredOpportunities;
                this.markers = markers;
            });
    }

    ngAfterViewInit() {
        this.map.centerChanged
            .pipe(debounce(() => interval(500)))
            .subscribe(() => {
                const center = this.map.getCenter();
                this.updateCenterLocation(new LatLng(center.lat(), center.lng()));
            });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.viewportHeightString = this.getViewportHeight();
        this.viewportHeightStringSidebar = this.getViewportHeightForSideBar();
    }

    getViewportHeight(): string {
        this.viewportHeight = window.innerHeight - 133;
        return `${this.viewportHeight}px`;
    }

    getViewportHeightForSideBar(): string {
        this.viewportHeight = window.innerHeight - 240;
        return `${this.viewportHeight}px`;
    }

    updateCenterLocation(newCenter: LatLng) {
        this.viewModel.centerLocationUpdater.next(newCenter);
    }

    filterUpdated(filter: OpportunityFilter) {
        this.viewModel.currentFilter = filter;
        const [, filtered, markers] = this.viewModel.filterOpportunities(this.opportunities, filter);
        this.filteredOpportunities = filtered;
        this.markers = markers;
    }

    expandRightSide() { this.setRightSideExpanded(true); }

    collapseRightSide() { this.setRightSideExpanded(false); }

    private setRightSideExpanded(expanded: boolean) {
        this.rightSideExpanded = expanded;
        setTimeout(() => this.rightSideComponentReplaced = expanded, 300);
    }

    setOpportunityToShowDetail(opp: Opportunity) {
        this.opportunityToShowDetail = opp;
    }

    markerClicked(markerIndex: number) {
        let opportunity = this.filteredOpportunities[markerIndex];
        this.expandRightSide();
        this.setOpportunityToShowDetail(opportunity)
    }
}
