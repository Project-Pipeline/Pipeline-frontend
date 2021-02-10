import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PlacePrediction} from "../models/model classes/maps/PlacePrediction";
import {Observable} from "rxjs";
import {GeocodingResponse} from "../models/model classes/maps/GeocodingResponse";
import * as config from "../../../config.json";

@Injectable({
    providedIn: 'root'
})
export class MapsService {
    private apiKey: string;

    constructor(private http: HttpClient) {
        this.apiKey = config.google_api_key;
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


}
