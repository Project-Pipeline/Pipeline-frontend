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
            color: 'green',
            text: opportunity.name
        };
        this.title = opportunity.name;
        this.options = {
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'assets/images/opportunities/opp-marker-icon.png',
                labelOrigin: new google.maps.Point(10, 40)
            }
        };
    }
}

export class CurrentLocationMarkerData {
    position: LatLng;
    label: google.maps.MarkerLabel;
    options: google.maps.MarkerOptions;

    constructor(loc: LatLng) {
        this.position = loc;
        this.options = {
            animation: google.maps.Animation.DROP,
            icon: "assets/images/opportunities/current-location.png"
        };
    }
}
