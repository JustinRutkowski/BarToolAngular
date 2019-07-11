import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'verwaltung', component: ManagementComponent },
  { path: 'auswertung', component: ManagementComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    OverlayComponent,
    CartComponent,
    ManagementComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatSelectModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
