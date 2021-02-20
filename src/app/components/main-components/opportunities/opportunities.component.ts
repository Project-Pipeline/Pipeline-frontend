import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MapsService} from "../../../services/maps.service";
import {OpportunitiesViewModel} from "./OpportunitiesViewModel";
import {OpportunitiesService} from "../../../services/opportunities.service";
import {Opportunity} from "../../../models/model classes/opportunities/Opportunity";
import {Subject} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {LatLng} from "../../../models/model classes/maps/GeocodingResponse";
import {GoogleMap} from "@angular/google-maps";
import {
    CurrentLocationMarkerData,
    OpportunityMarkerData
} from "../../../models/model classes/opportunities/OpportunityMarkerData";

@Component({
    selector: 'app-opportunities',
    templateUrl: './opportunities.component.html',
    styleUrls: ['./opportunities.component.scss']
})
export class OpportunitiesComponent implements OnInit {
    @ViewChild(GoogleMap, { static: false }) map: GoogleMap
    viewportHeight: number = null;
    viewportHeightString: string = null;
    viewModel: OpportunitiesViewModel;
    opportunities: Opportunity[] = [];
    // center location is the type
    opportunitiesUpdater: Subject<LatLng> = new Subject<LatLng>();
    center: LatLng;
    mapOptions: google.maps.MapOptions = null;
    markers: OpportunityMarkerData[] = [];
    centerMarker: CurrentLocationMarkerData = null;

    constructor(private mapsService: MapsService, private opportunitiesService: OpportunitiesService) {
        this.viewportHeightString = this.getViewportHeight();
        this.viewModel = new OpportunitiesViewModel(mapsService, opportunitiesService);
        this.mapOptions = this.viewModel.mapOptions;
    }

    ngOnInit(): void {
        this.viewModel.getUserLocation()
            .subscribe((latlng) => {
                this.center = latlng;
                this.centerMarker = new CurrentLocationMarkerData(latlng);
                this.updateOpportunities(latlng);
            });

        this.opportunitiesUpdater
            .pipe(mergeMap(() => this.viewModel.getOpportunitiesCenteredOn(this.center)))
            .subscribe(([opportunities, markers]) => {
                this.opportunities = opportunities;
                this.markers = markers;
            });
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.viewportHeightString = this.getViewportHeight();
    }

    getViewportHeight(): string {
        this.viewportHeight = window.innerHeight - 80;
        return `${this.viewportHeight}px`;
    }

    updateOpportunities(newCenter: LatLng) {
        this.opportunitiesUpdater.next(newCenter);
    }

    centerChanged() {

    }

}
