import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-text-pair-editor',
    templateUrl: './text-pair-editor.component.html',
    styleUrls: ['./text-pair-editor.component.scss']
})
export class TextPairEditorComponent implements OnInit {
    @Input() dataSource: [string, string][];
    @Input() description: string;
    @Input() leftInputPlaceholder: string;
    @Input() rightFieldPlaceholder: string;
    @Input() defaultValueWhenAddingRows: [string, string] = ['', ''];

    private leftDefaultValue: string;
    private rightDefaultValue: string;

    constructor() {
    }

    ngOnInit(): void {
        this.leftDefaultValue = this.defaultValueWhenAddingRows[0];
        this.rightDefaultValue = this.defaultValueWhenAddingRows[1];
    }

    addRow() {
        this.dataSource.push([this.leftDefaultValue, this.rightDefaultValue]);
    }

    deleteRowAt(index: number) {
        this.dataSource.splice(index, 1);
    }

}
