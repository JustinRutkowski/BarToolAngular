import { trigger, transition, style, query, group, animate, state } from "@angular/animations";
import { Optional } from '@angular/core';

export const slideInAnimation = trigger('routeAnimations', [
    transition('main => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
            })
        ], { optional: true }),
        query(':enter', [
            style({
                left: '100%', position: 'relative'
            })
        ], { optional: true }),
        group([
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ], { optional: true }),
            query(':leave', [
                animate('300ms ease-out', style({
                    left: '-100%'
                }))
            ], { optional: true })
        ])
    ]),
    transition('auswertung => *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], { optional: true }),
        query(':enter', [
            style({
                left: '-100%', position: 'relative'
            })
        ], { optional: true }),
        group([
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ], { optional: true }),
            query(':leave', [
                animate('300ms ease-out', style({ left: '100%' }))
            ], { optional: true })
        ])
    ]),
    transition('verwaltung => main', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], { optional: true }),
        query(':enter', [
            style({
                left: '-100%', position: 'relative'
            })
        ], { optional: true }),
        group([
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ], { optional: true }),
            query(':leave', [
                animate('300ms ease-out', style({ left: '100%' }))
            ], { optional: true })
        ])
    ]),
    transition('verwaltung => auswertung', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], { optional: true }),
        query(':enter', [
            style({
                left: '100%', position: 'relative'
            })
        ], { optional: true }),
        group([
            query(':enter', [
                animate('300ms ease-out', style({ left: '0%' }))
            ], { optional: true }),
            query(':leave', [
                animate('300ms ease-out', style({ left: '-100%' }))
            ], { optional: true })
        ])
    ])
])