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

export const expand = trigger('expand', [
    state('shrinked', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
    })),
    state('expanded', style({
        overflow: 'hidden',
        height: '*',
    })),
    transition('shrinked => expanded', [
        animate('0.3s ease-in-out')
    ]),
    transition('expanded => shrinked', [
        animate('0.3s ease-in-out')
    ])
]);


