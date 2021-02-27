export class GeonamesResponse {
    postalCodes: GeonamesPostalCode[];
}

export class GeonamesPostalCode {
    countryCode: string;
    distance: string;
    lat: number;
    lng: number;
    placeName: string;
    postalCode: string;
}
