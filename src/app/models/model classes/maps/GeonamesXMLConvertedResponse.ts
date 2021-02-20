export class GeonamesXMLConvertedResponse {
    geonames: GeonamesXMLConvertedResponseGeonames;
}

export class GeonamesXMLConvertedResponseGeonames {
    code: GeonamesXMLConvertedResponseCode[];
}

export interface GeonamesXMLConvertedResponseCode {
    countryCode: string[];
    distance: string[];
    lat: string[];
    lng: string[];
    name: string[];
    postalcode: string[];
}
