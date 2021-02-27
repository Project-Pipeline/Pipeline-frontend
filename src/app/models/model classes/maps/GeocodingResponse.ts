// https://developers.google.com/maps/documentation/geocoding/start
export class GeocodingResponse {
    // omit plus_code
    results: GeocodingResponseResult[];
}

export class GeocodingResponseResult {
    address_components: GeocodingAddressComponents[];
    formatted_address: string;
    geometry: GeocodingGeometry;
    place_id: string;
    // omit plus_code
    types: string[];
}

export class GeocodingAddressComponents {
    long_name: string;
    short_name: string;
    types: string[];
}

export class GeocodingGeometry {
    location: LatLng;
    location_type: string;
    viewport: GeocodingViewport;
}

export class GeocodingViewport {
    northeast: LatLng;
    southwest: LatLng;
}

export class LatLng {
    constructor(
        public lat: number,
        public lng: number
    ) {
    }
}
