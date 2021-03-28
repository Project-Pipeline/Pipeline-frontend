import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlacePrediction, PlacePredictionResult} from "../models/model classes/maps/PlacePrediction";
import {Observable} from "rxjs";
import {LatLng} from "../models/model classes/maps/GeocodingResponse";
import {map} from "rxjs/operators";
import {ConfigService} from "./config.service";
import {GeonamesPostalCode, GeonamesResponse} from "../models/model classes/maps/GeonamesResponse";

@Injectable({
    providedIn: 'root'
})
export class MapsService {
    private geonamesUsername: string;
    private geoNamesAPIRoot = 'https://secure.geonames.org/';
    private geoCoder = new google.maps.Geocoder();
    private autoCompleter = new google.maps.places.AutocompleteService();

    constructor(private http: HttpClient, private configService: ConfigService) {
        const config = configService.config;
        this.geonamesUsername = config.geonames_username;
    }

    getAddressSuggestions(searchTerm: string): Observable<PlacePrediction> {
        return new Observable<PlacePrediction>((observer) => {
            this.autoCompleter.getQueryPredictions(
                {input: searchTerm},
                (predictions, status) => {
                if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
                    observer.error('Autocomplete error');
                } else {
                    observer.next(new PlacePrediction(
                        predictions.map((p) => new PlacePredictionResult(
                            p.description,
                            p.matched_substrings,
                            p.place_id,
                            '',
                            p.terms
                        ))
                    ));
                }
            });
        });
    }

    getGeocodingResponse(address: string): Observable<google.maps.GeocoderResult[]> {
        const formattedAddress = address.replace(' ', '+');
        return new Observable<google.maps.GeocoderResult[]>((observer) => {
            this.geoCoder.geocode({address: formattedAddress}, (res, status) => {
               if (status == google.maps.GeocoderStatus.ERROR) {
                   observer.error("geocoding error");
               } else {
                   observer.next(res);
               }
            });
        });
    }

    getCurrentLocation(): Observable<LatLng> {
        return new Observable<LatLng>((observer) => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    observer.next(new LatLng(position.coords.latitude, position.coords.longitude))
                });
            } else {
                observer.error(new Error('Your browser does not support geoLocation'));
            }
        });
    }

    getNearbyZipcodes(latitude: number, longitude: number): Observable<GeonamesPostalCode[]> {
        return this.http.get<GeonamesResponse>(
            `${this.geoNamesAPIRoot}findNearbyPostalCodesJSON`, {
                params: {
                    lat: `${latitude}`,
                    lng: `${longitude}`,
                    username: this.geonamesUsername,
                    style: "SHORT"
                }
            })
            .pipe(map((res) => res.postalCodes));
    }
}
