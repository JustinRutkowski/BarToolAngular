import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';
import { ProduktService } from '../produkt.service';

@Component({
  selector: 'management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})

export class ManagementComponent implements OnInit {
  produkteName: string[];
  produkte: Produkt[];
  message: string;
  error = '';
  location = location;

  constructor(private produktService: ProduktService) { }

  ngOnInit() {
    this.produktService.currentMessage.subscribe(message => this.message = message)
    this.produkte = JSON.parse(this.message);
    this.produkteName = Array.from(new Set(this.produkte.map(x => x.Art)));
  }

  off(overlay: HTMLElement) {
    overlay.className = "overlay fade-out";
    setTimeout(() => {
      overlay.style.display = "none";
      overlay.className = "overlay fade-in";
    }, 275);
  }
  /**
 ** Colors the productbuttons in the desired colors
 * @param index Buttonindex from ngFor
 */
  getColor(index: number) {
    if (index % 3 == 0) {
      return '#468bd3'
    }
    if (index % 3 == 1) {
      return '#ffad05'
    }
    if (index % 3 == 2) {
      return '#c11c0e'
    }
  }

  /**
 ** Displays overlay to choose the size and quantity
 ** Shows name of the selected product
 * @param Art Name of the Product to display it on top of the overlay
 */
  deleteProductOverlay(Art: string) {
    // Zuweisung des Namens des jeweiligen Produktes für das Overlay
    document.getElementById("title").innerText = Art;
    document.getElementById('overlay').style.display = "block";
  }

  deleteProduct(item) {
    this.produktService.delete(item).subscribe(
      (res: Produkt[]) => {
        console.log(res);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  confirm(item){
    if(window.confirm(item.Art + " in " + item.Groesse + " Liter Variante wirklich löschen?")){
      this.deleteProduct(item);
    };
  }
}