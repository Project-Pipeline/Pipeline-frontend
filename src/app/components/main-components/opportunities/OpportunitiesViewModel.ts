import {MapsService} from "../../../services/maps.service";
import {OpportunitiesService} from "../../../services/opportunities.service";
import {Observable, Subject} from "rxjs";
import {LatLng} from "../../../models/model classes/maps/GeocodingResponse";
import {Opportunity} from "../../../models/model classes/opportunities/Opportunity";
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {OpportunityMarkerData} from "../../../models/model classes/opportunities/OpportunityMarkerData";
import {OpportunityFilter} from "../../../models/model classes/opportunities/OpportunityFilter";

export class OpportunitiesViewModel {
    centerLocationUpdater: Subject<LatLng> = new Subject<LatLng>(); // center location is the type
    currentFilter: OpportunityFilter = new OpportunityFilter();
    constructor(
        private mapsService: MapsService,
        private opportunitiesService: OpportunitiesService,
    ) {
    }

    mapOptions: google.maps.MapOptions = {
        streetViewControl: false,
        disableDoubleClickZoom: true,
        fullscreenControl: false,
        maxZoom: 20,
        minZoom: 8,
        styles: [
            {
                "featureType": "poi",
                "stylers": [
                    {"visibility": "off"}
                ]
            }
        ]
    };

    getUserLocation(): Observable<LatLng> {
        return this.mapsService.getCurrentLocation();
    }

    getOpportunitiesCenteredOn(
        center: LatLng,
        filter: OpportunityFilter = this.currentFilter
    ): Observable<[Opportunity[], Opportunity[], OpportunityMarkerData[]]> {
        return this.mapsService
            .getNearbyZipcodes(center.lat, center.lng)
            .pipe(distinctUntilChanged((res1, res2) => res1 === res2))
            .pipe(map((zipcodes) => {
                return zipcodes.map((z) => z.postalcode[0]);
            }))
            .pipe(switchMap((zipcodes) => this.opportunitiesService.getOpportunities([], zipcodes)))
            .pipe(map((opportunities) => {
                return this.filterOpportunities(opportunities, filter);
            }));
    }

    /// Return values: unfiltered opportunities, filter opportunities, and markers based on filters opps
    filterOpportunities(opportunities: Opportunity[], filter: OpportunityFilter): [Opportunity[], Opportunity[], OpportunityMarkerData[]] {
        const filtered = filter.filter(opportunities);
        return [
            opportunities,
            filtered,
            filtered.map((o) => new OpportunityMarkerData(o))
        ];
    }
}
