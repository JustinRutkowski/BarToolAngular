import { Component, Input } from '@angular/core';
import { Produkt } from './produkt';
import { ProduktService } from './produkt.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})
export class MainComponent {
    produkte: Produkt[];
    produkteName: String[];
    error = '';
    success = '';
  
    // Dependency Injection
    constructor(private produktService: ProduktService) {}
  
    /**
     * Get the products from Database on load
     */
    ngOnInit() {
      this.getProdukte();
    }
  
    /**
     ** Selects all products from the Database
     ** Uses service for request
     */
    getProdukte(): void {
      this.produktService.getAll().subscribe(
        (res: Produkt[]) => {
          // getting the unique product names
          this.produkteName = Array.from(new Set(res.map(x => x.Art)));
          this.produkte = res;
        },
        (err) => {
          this.error = err;
        }
      );
    }
  

    /**
   ** Displays overlay to choose the size and quantity
   ** Shows name of the selected product
   * @param Art Name of the Product to display it on top of the overlay
   */
  ChooseQuantityAndSize(Art: string) {
    // Zuweisung des Namens des jeweiligen Produktes für das Overlay
    document.getElementById("title").innerText = Art;
    document.getElementById('overlay').style.display = "block";
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
}