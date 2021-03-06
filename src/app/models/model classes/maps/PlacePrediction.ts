// Payload for the Google Places AutoComplete Response

export class PlacePrediction {
    predictions: PlacePredictionResult[];

    constructor(predictions: PlacePredictionResult[]) {
        this.predictions = predictions;
    }
}

export class PlacePredictionResult {
    constructor(
        public description: string,
        public matched_substrings: LengthOffset[],
        public place_id: string,
        public reference: string,
        public terms: OffsetAndValue[],
    ) {
    }
}

export class LengthOffset {
    length: number;
    offset: number;
}

export class OffsetAndValue {
    offset: number;
    value: string;
}
