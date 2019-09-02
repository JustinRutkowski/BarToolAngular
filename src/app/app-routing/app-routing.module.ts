import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from '../main.component';
import { ManagementComponent } from '../management/management.component';
import { AuswertungComponent } from '../auswertung/auswertung.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent, data: { animation: 'main' } },
  { path: 'verwaltung', pathMatch: 'full', component: ManagementComponent, data: { animation: 'verwaltung' } },
  { path: 'auswertung', pathMatch: 'full', component: AuswertungComponent, data: { animation: 'auswertung' } }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
