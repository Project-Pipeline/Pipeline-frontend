import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-row-text-editor',
    templateUrl: './row-text-editor.component.html',
    styleUrls: ['./row-text-editor.component.scss']
})
export class RowTextEditorComponent implements OnInit {
    @Input() dataSource: [string][];
    @Input() description: string;
    @Input() inputPlaceholder: string;
    @Input() defaultValueWhenAddingRows: string = '';

    private defaultRowValue: string;

    constructor() {
    }

    ngOnInit(): void {
        this.defaultRowValue = this.defaultValueWhenAddingRows;
    }

    addRow() {
        this.dataSource.push([this.defaultRowValue]);
    }

    deleteRowAt(index: number) {
        this.dataSource.splice(index, 1);
    }
}
