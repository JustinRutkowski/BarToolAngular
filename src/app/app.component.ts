import { Component } from '@angular/core';
import { Produkt } from './produkt';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './_animations/animation';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})

export class AppComponent {
  cartProdukte: Produkt[] = new Array();

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  ngAfterViewInit(){
    document.getElementById("nutzer").innerHTML = localStorage.getItem("login");
  }
}
