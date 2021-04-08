import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {fadeOnAppear, rotate180Degrees} from "../../../../../models/model classes/AngularAnimations";

@Component({
    selector: 'app-resume-builder-header',
    templateUrl: './resume-builder-header.component.html',
    styleUrls: ['./resume-builder-header.component.scss'],
    animations: [rotate180Degrees, fadeOnAppear]
})
export class ResumeBuilderHeaderComponent implements OnInit {
    @Input() title: string;
    @Input() initialState: boolean = null;
    @Input() actionTitle = '';
    @Output() expanded: EventEmitter<void> = new EventEmitter<void>();
    @Output() collapsed: EventEmitter<void> = new EventEmitter<void>();
    @Output() actionButtonClicked: EventEmitter<void> = new EventEmitter<void>();
    rotated = false;

    constructor() {
    }

    ngOnInit(): void {
        if (this.initialState) this.rotated = this.initialState;
    }

    toggleRotation() {
        this.rotated = !this.rotated;
        if (this.rotated) {
            this.expanded.emit();
        } else {
            this.collapsed.emit();
        }
    }
}
