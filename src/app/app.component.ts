import { Component } from '@angular/core';
import { Produkt } from './produkt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  cartProdukte: Produkt[] = new Array();
  location;
}
