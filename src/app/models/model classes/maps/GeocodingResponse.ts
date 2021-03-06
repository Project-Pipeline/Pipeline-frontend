// https://developers.google.com/maps/documentation/geocoding/start
export class GeocodingResponse {
    // omit plus_code
    constructor(public results: GeocodingResponseResult[]) {
    }
}

export class GeocodingResponseResult {
    constructor(
        public address_components: GeocodingAddressComponents[],
        public formatted_address: string,
        public geometry: GeocodingGeometry,
        public place_id: string,
        // omit plus_code
        public types: string[],
    ) {
    }
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
