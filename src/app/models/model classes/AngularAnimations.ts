import {animate, style, transition, trigger} from "@angular/animations";

export const expandShrink = trigger('expandShrink', [
    transition(':enter', [
        style({
            overflow: 'hidden',
            height: '*',
        }),
        animate('300ms ease-out', style({opacity: 1}))
    ]),
    transition(':leave', [
        style({
            opacity: '0',
            overflow: 'hidden',
            height: '0px',
        }),
        animate('300ms ease-in', style({opacity: 0}))
    ])
]);
