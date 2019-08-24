// import { AuswertungComponent } from './auswertung.component';
// import {
//   TestBed,
//   ComponentFixture,
//   async,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';
// import { GoogleChartsModule } from 'angular-google-charts';
// import { Observable } from 'rxjs';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { Location } from '@angular/common';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   template: '',
// })
// class DummyComponent { }

// const mockChartData = [
//   ['Date', 'Variable X', 'Variable Y'],
//   ['29/sep.', '30', '29'],
//   ['30/sep.', '30', '29'],
//   ['01/oct.', '30', '29'],
//   ['02/oct.', '30', '29'],
//   ['03/oct.', '30', '29'],
//   ['04/oct.', '30', '28'],
// ];

// fdescribe('AuswertungComponent', () => {
//   let component: AuswertungComponent;
//   let fixture: ComponentFixture<AuswertungComponent>;
//   let dom: HTMLElement;
//   let location: Location;
//   let router: Router;
//   let dataSentToGoogleChartDrawMethod: [[], {}];
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AuswertungComponent, DummyComponent],
//       imports: [
//         HttpClientModule,
//         GoogleChartsModule,
//         RouterTestingModule,
//         RouterTestingModule.withRoutes([
//           {
//             path: 'auswertung',
//             component: AuswertungComponent,
//           },
//           {
//             path: 'verwaltung',
//             component: DummyComponent,
//           },
//         ]),
//       ],
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AuswertungComponent);
//     component = fixture.componentInstance;
//     dom = fixture.debugElement.nativeElement;
//     router = TestBed.get(Router);
//     location = TestBed.get(Location);
//     component.myData = mockChartData;
//     component.myOptions = {  };
//     window['google'] = {
//       charts: {
//         load: function (): void { },
//         setOnLoadCallback: function (callback: Function): Observable<any> {
//           return Observable.create();
//         },
//       },
//       visualization: {
//         arrayToDataTable: function (data: string[][]): string[][] {
//           return data;
//         },
//         Bar: class {
//           dataReceived: any;
//           constructor(data: string[][]) {
//             this.dataReceived = data;
//           }
//           draw = function (data: any, options: {}) {
//             dataSentToGoogleChartDrawMethod = [data, options];
//           };
//         },
//       },
//     };
//     fixture.detectChanges();
//   });

//   it('should mount', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call a Google Chart draw method onInit', async () => {
//     const spySetOnLoadCallback = spyOn(
//       google['charts'],
//       'setOnLoadCallback',
//     ).and.callThrough();
//     component.ngOnInit();
//     expect(spySetOnLoadCallback).toHaveBeenCalled();
//   });

//   it('should call Google Chart methods to build charts when drawChart is called', () => {
//     component.drawChart();
//     expect(dataSentToGoogleChartDrawMethod).toEqual([
//       mockChartData,
//       { options: 'custom options' },
//     ]);
//   });

//   it('should re-render Chart when window is resized when on /auswertung page', fakeAsync(() => {
//     router.navigate(['/auswertung']);
//     tick();
//     const spyOnDrawChart = spyOn(component, 'drawChart');
//     expect(location.path()).toBe('/auswertung');
//     window.dispatchEvent(new Event('resize'));
//     expect(spyOnDrawChart).toHaveBeenCalled();
//   }));

//   it('should NOT try to re-render chart when window is resized on other pages than /auswertung', fakeAsync(() => {
//     router.navigate(['/verwaltung']);
//     tick();
//     const spyOnDrawChart = spyOn(component, 'drawChart');
//     expect(location.path()).toBe('/verwaltung');
//     window.dispatchEvent(new Event('resize'));
//     expect(spyOnDrawChart).not.toHaveBeenCalled();
//   }));
// });