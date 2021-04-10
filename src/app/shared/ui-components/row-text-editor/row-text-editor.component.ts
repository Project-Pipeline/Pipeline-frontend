import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-row-text-editor',
    templateUrl: './row-text-editor.component.html',
    styleUrls: ['./row-text-editor.component.scss']
})
/// Two ways to use this:
/// - 1:
/// - 2 :
export class RowTextEditorComponent implements OnInit {
    @Input() dataSource: [string][];
    @Input() description: string;
    @Input() inputPlaceholder: string;
    @Input() defaultValueWhenAddingRows: string = '';

    @Input() alternateDataSource: string[];
    @Output() alternateDataSourceUpdated: EventEmitter<string[]> = new EventEmitter<string[]>();
    alternateDataSourceMapped: [string][];

    private defaultRowValue: string;

    constructor() {
    }

    ngOnInit(): void {
        this.defaultRowValue = this.defaultValueWhenAddingRows;
        if (this.alternateDataSource) {
            this.alternateDataSourceMapped = this.alternateDataSource.map((d) => [d]);
        }
    }

    // regular

    addRow() {
        this.dataSource.push([this.defaultRowValue]);
    }

    deleteRowAt(index: number) {
        this.dataSource.splice(index, 1);
    }

    // alternate

    addRowAlternate() {
        this.alternateDataSourceMapped.push([this.defaultRowValue]);
        this.updateAlternateDataSource();
    }

    deleteRowAlternate(index: number) {
        this.alternateDataSourceMapped.splice(index, 1);
        this.updateAlternateDataSource();
    }

    updateAlternateDataSource() {
        this.alternateDataSourceUpdated.emit(
            this.alternateDataSourceMapped.map((d) => d[0])
        );
    }
}
