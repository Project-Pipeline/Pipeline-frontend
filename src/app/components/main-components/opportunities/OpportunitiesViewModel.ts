import {MapsService} from "../../../services/maps.service";
import {OpportunitiesService} from "../../../services/opportunities.service";
import {Observable, Subject} from "rxjs";
import {LatLng} from "../../../models/model classes/maps/GeocodingResponse";
import {Opportunity} from "../../../models/model classes/opportunities/Opportunity";
import {distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {OpportunityMarkerData} from "../../../models/model classes/opportunities/OpportunityMarkerData";
import {OpportunityFilter} from "../../../models/model classes/opportunities/OpportunityFilter";
import {animate, state, style, transition, trigger} from "@angular/animations";

export class OpportunitiesViewModel {
    centerLocationUpdater: Subject<LatLng> = new Subject<LatLng>(); // center location is the type
    currentFilter: OpportunityFilter = new OpportunityFilter();
    constructor(
        private mapsService: MapsService,
        private opportunitiesService: OpportunitiesService,
    ) {
    }

    mapOptions: google.maps.MapOptions = {
        disableDoubleClickZoom: true,
        fullscreenControl: false,
        maxZoom: 20,
        minZoom: 14,
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
                return zipcodes.map((z) => z.postalCode);
            }))
            .pipe(switchMap((zipcodes) => this.opportunitiesService.getOpportunities([], zipcodes)))
            .pipe(map((opportunities) => {
                return this.filterOpportunities(opportunities, filter);
            }));
    }

    /// Return values: unfiltered opportunities, filtered opportunities, and markers based on filtered opps
    filterOpportunities(opportunities: Opportunity[], filter: OpportunityFilter): [Opportunity[], Opportunity[], OpportunityMarkerData[]] {
        const filtered = filter.filter(opportunities);
        return [
            opportunities,
            filtered,
            filtered.map((o) => new OpportunityMarkerData(o))
        ];
    }
}

export const expandRightPanel = trigger('expandRightPanel', [
    state('default', style(  { width: '500px' })),
    state('expanded', style({ width: '700px' })),
    transition('expanded => default', animate('300ms ease-out')),
    transition('default => expanded', animate('300ms ease-in'))
]);

export const rightPanelFade = trigger('rightPanelFade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({opacity: 1}))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in', style({opacity: 0}))
    ])
]);


