import {animate, state, style, transition, trigger} from "@angular/animations";

export const rotate180Degrees = trigger('rotate180Degrees', [
    state('default', style({
        transform: 'rotate(0)',
        'transform-origin': 'center'
    })),
    state('rotated', style({
        transform: 'rotate(180deg)',
        'transform-origin': 'center'
    })),
    transition('rotated => default', animate('200ms ease-out')),
    transition('default => rotated', animate('200ms ease-in'))
]);

