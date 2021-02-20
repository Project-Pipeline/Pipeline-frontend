import {MapsService} from "../../../services/maps.service";
import {OpportunitiesService} from "../../../services/opportunities.service";
import {Observable} from "rxjs";
import {LatLng} from "../../../models/model classes/maps/GeocodingResponse";
import {Opportunity} from "../../../models/model classes/opportunities/Opportunity";
import {map, mergeMap} from "rxjs/operators";
import {OpportunityMarkerData} from "../../../models/model classes/opportunities/OpportunityMarkerData";

export class OpportunitiesViewModel {
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

    getOpportunitiesCenteredOn(center: LatLng): Observable<[Opportunity[], OpportunityMarkerData[]]> {
        return this.mapsService
            .getNearbyZipcodes(center.lat, center.lng)
            .pipe(map((zipcodes) => {
                return zipcodes.map((z) => z.postalcode[0]);
            }))
            .pipe(mergeMap((zipcodes) => this.opportunitiesService.getOpportunities([], zipcodes)))
            .pipe(map((op) => {
                return [op, op.map((op) => new OpportunityMarkerData(op))]
            }));
    }
}
