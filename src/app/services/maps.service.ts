import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlacePrediction} from "../models/model classes/maps/PlacePrediction";
import {Observable} from "rxjs";
import {GeocodingResponse, LatLng} from "../models/model classes/maps/GeocodingResponse";
import * as xml2js from 'xml2js';
import {map} from "rxjs/operators";
import {ConfigService} from "./config.service";
import {GeonamesPostalCode, GeonamesResponse} from "../models/model classes/maps/GeonamesResponse";

@Injectable({
    providedIn: 'root'
})
export class MapsService {
    private googleApiKey: string;
    private geonamesUsername: string;
    private geoNamesAPIRoot = 'https://secure.geonames.org/';

    constructor(private http: HttpClient, private configService: ConfigService) {
        const config = configService.config;
        this.googleApiKey = config.google_api_key;
        this.geonamesUsername = config.geonames_username;
    }

    getAddressSuggestions(searchTerm: string): Observable<PlacePrediction> {
        return this.http.get<PlacePrediction>(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&key=${this.googleApiKey}`
        );
    }

    getGeocodingResponse(address: string): Observable<GeocodingResponse> {
        const formattedAddress = address.replace(' ', '+');
        return this.http.get<GeocodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${this.googleApiKey}`
        );
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

    private xmlToJson<Result>(xml: any): Observable<Result> {
        const parser: xml2js.Parser = new xml2js.Parser();
        return new Observable<Result>((observer) => {
            parser.parseString(xml, (err, result) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(result);
                }
            });
        });
    }
}
