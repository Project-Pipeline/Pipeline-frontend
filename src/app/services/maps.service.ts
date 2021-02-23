import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PlacePrediction} from "../models/model classes/maps/PlacePrediction";
import {Observable} from "rxjs";
import {GeocodingResponse, LatLng} from "../models/model classes/maps/GeocodingResponse";
import * as xml2js from 'xml2js';
import {map, mergeMap} from "rxjs/operators";
import {
    GeonamesXMLConvertedResponse,
    GeonamesXMLConvertedResponseCode
} from "../models/model classes/maps/GeonamesXMLConvertedResponse";
import {ConfigService} from "./config.service";

@Injectable({
    providedIn: 'root'
})
export class MapsService {
    private apiKey: string;

    constructor(private http: HttpClient, private configService: ConfigService) {
        this.configService.loadConfig()
            .then((config) => this.apiKey = config.google_api_key);
    }

    getAddressSuggestions(searchTerm: string): Observable<PlacePrediction> {
        return this.http.get<PlacePrediction>(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&key=${this.apiKey}`
        );
    }

    getGeocodingResponse(address: string): Observable<GeocodingResponse> {
        const formattedAddress = address.replace(' ', '+');
        return this.http.get<GeocodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${this.apiKey}`
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

    getNearbyZipcodes(latitude: number, longitude: number): Observable<GeonamesXMLConvertedResponseCode[]> {
        const headers = new HttpHeaders({ 'Content-Type': 'text/xml' }).set('Accept', 'text/xml');
        return this.http.get(
            `http://api.geonames.org/findNearbyPostalCodes?lat=${latitude}&lng=${longitude}&username=ljw980105&style=SHORT`, {
                headers: headers,
                responseType: 'text'
            }
        )
            .pipe(mergeMap((xml) => this.xmlToJson<GeonamesXMLConvertedResponse>(xml)))
            .pipe(map((res) => res.geonames.code));
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
