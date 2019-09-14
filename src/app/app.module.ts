import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { OverlayComponent } from './overlay/overlay.component';
import { CartComponent } from './cart/cart.component';
import { ManagementComponent } from './management/management.component';
import { MainComponent } from './main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { AuswertungComponent } from './auswertung/auswertung.component';
import { WavesModule, TableModule, IconsModule } from 'angular-bootstrap-md';
import { LoginComponent } from './login/login/login.component';
import { ExcelService } from './excel.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
// const appRoutes: Routes = [
//   { path: '', component: MainComponent },
//   { path: 'verwaltung', component: ManagementComponent },
//   { path: 'auswertung', component: AuswertungComponent },
// ];

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent,
    CartComponent,
    ManagementComponent,
    MainComponent,
    AuswertungComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    TableModule,
    WavesModule,
    IconsModule,
    AppRoutingModule,

    // RouterModule.forRoot(appRoutes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{provide: LOCALE_ID, useValue: "de-CH"}, ExcelService],

  bootstrap: [AppComponent]
})
export class AppModule {

}
