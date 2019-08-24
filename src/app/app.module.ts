import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { OverlayComponent } from './overlay/overlay.component';
import { CartComponent } from './cart/cart.component';
import { ManagementComponent } from './management/management.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { MainComponent } from './main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { Routes, RouterModule } from '@angular/router';
import { AuswertungComponent } from './auswertung/auswertung.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'verwaltung', component: ManagementComponent },
  { path: 'auswertung', component: AuswertungComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent,
    CartComponent,
    ManagementComponent,
    MainComponent,
    AuswertungComponent,
  ],
  imports: [
    GoogleChartsModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {

}
