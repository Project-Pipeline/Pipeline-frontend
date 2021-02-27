// Payload for the Google Places AutoComplete Response

export class PlacePrediction {
    predictions: PlacePredictionResult[];

    constructor(predictions: PlacePredictionResult[]) {
        this.predictions = predictions;
    }
}

export class PlacePredictionResult {
    description: string;
    matched_substrings: LengthOffset[];
    place_id: string;
    reference: string;
    terms: OffsetAndValue[];
}

export class LengthOffset {
    length: number;
    offset: number;
}

export class OffsetAndValue {
    offset: number;
    value: string;
}
