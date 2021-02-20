import {LatLng} from "../maps/GeocodingResponse";
import {Opportunity} from "./Opportunity";

export class OpportunityMarkerData {
    position: LatLng;
    label: google.maps.MarkerLabel;
    title: string;
    options: google.maps.MarkerOptions;

    constructor(opportunity: Opportunity) {
        this.position = new LatLng(opportunity.address.latitude, opportunity.address.longitude);
        this.label = {
            color: 'red',
            text: opportunity.name
        };
        this.title = opportunity.name;
        this.options = { animation: google.maps.Animation.DROP };
    }
}

export class CurrentLocationMarkerData {
    position: LatLng;
    label: google.maps.MarkerLabel;
    options: google.maps.MarkerOptions;

    constructor(loc: LatLng) {
        this.position = loc;
        this.label = {
            color: 'blue',
            text: 'i'
        };
        this.options = { animation: google.maps.Animation.DROP };
    }
}
