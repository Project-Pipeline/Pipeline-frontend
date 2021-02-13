import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MapsService} from "../../../../services/maps.service";
import {fromEvent, interval, of} from "rxjs";
import {catchError, debounce, filter, map, share, switchMap} from "rxjs/operators";
import {PlacePredictionResult} from "../../../../models/model classes/maps/PlacePrediction";
import {Address} from "../../../../models/model classes/user/Address";

@Component({
    selector: 'app-address-auto-completer',
    templateUrl: './address-auto-completer.component.html',
    styleUrls: ['./address-auto-completer.component.scss']
})
export class AddressAutoCompleterComponent implements AfterViewInit {
    @ViewChild('autoCompleteInput') autoCompleteInput;
    @Output() addressSelected: EventEmitter<Address> = new EventEmitter();
    searchResults: PlacePredictionResult[];
    showSearches = true;
    selectedAddress: string = null;
    errorText: string = null;

    constructor(private mapsApi: MapsService) {
    }

    ngAfterViewInit() {
        const autoComplete = fromEvent<KeyboardEvent>(this.autoCompleteInput.nativeElement, 'keyup')
            .pipe(map(x => (x.currentTarget as HTMLInputElement).value))
            .pipe(debounce(() => interval(500)))
            .pipe(switchMap(((term) => this.mapsApi.getAddressSuggestions(term))))
            .pipe(catchError(() => of(undefined)))
            .pipe(share());

        autoComplete
            .pipe(filter((res) => res != undefined))
            .subscribe((res) => {
                this.selectedAddress = null;
                this.errorText = null;
                if (!this.showSearches) this.showSearches = true;
                this.searchResults = res.predictions;
            });

        autoComplete
            .pipe(filter((res) => res == undefined))
            .subscribe(() => this.handleError());
    }

    placeSelected(place: PlacePredictionResult) {
        this.showSearches = false;
        this.selectedAddress = place.description;
        const getGeocode = this.mapsApi
            .getGeocodingResponse(place.description)
            .pipe(catchError(() => of(undefined)))
            .pipe(share());

        getGeocode
            .pipe(filter((res) => res != undefined))
            .subscribe((geocode) => {
                let postalCode: string = null;
                this.errorText = null;
                const result = geocode.results[0];
                result.address_components.forEach((comp) => {
                   if (comp.types.includes('postal_code')) {
                       postalCode = comp.long_name;
                   }
                });
                const address = new Address(
                    place.terms.map((t) => t.value),
                    result.geometry.location.lat,
                    result.geometry.location.lng,
                    postalCode
                );
                this.addressSelected.emit(address);
            });

        getGeocode
            .pipe(filter((res) => res == undefined))
            .subscribe(() => this.handleError());
    }

    handleError() {
        this.errorText = 'There\'s been an error. Please try again';
        this.showSearches = false;
    }

}
