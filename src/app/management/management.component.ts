import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';
import { ProduktService } from '../produkt.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

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
  productName;
  productSize;
  productPrice;
  productPurchase;

  constructor(private produktService: ProduktService, private router: Router) { }

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
    document.getElementById('deleteOverlay').style.display = "block";
  }

  deleteProduct(item) {
    this.produktService.delete(item).subscribe(
      (res: Produkt[]) => {
        setTimeout(() => {
          this.router.navigateByUrl('/verwaltung');
        }, 50);
        swal("Gelöscht!", `${item.Art} in ${item.Groesse} Liter Variante wurde gelöscht`, "success");
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addProduct(name, size, price, purchase, f) {
    this.router.navigateByUrl('');
    var item = new Produkt("", "", "", "", "");

    item.Art = name;
    item.Groesse = size;
    item.Preis = price;
    item.Einkaufspreis = purchase

    this.produktService.add(item).subscribe(
      (res: Produkt[]) => {
        setTimeout(() => {
          this.router.navigateByUrl('/verwaltung');
        }, 50);
        swal("Hinzugefügt!", `${item.Art} in ${item.Groesse} Liter Variante zum Preis von ${item.Preis}€ wurde hinzugefügt`, "success");
        f.reset();
      },
      (err) => {
        this.error = err;
      }
    );
  }

  async confirm(item) {
    const willDelete = await swal({
      title: "Produkt löschen?",
      text: `${item.Art} in ${item.Groesse} Liter Variante zum Preis von ${item.Preis}€ wirklich löschen?`,
      icon: "warning",
      buttons: ["Nein", "Ja"],
      dangerMode: true,
    });

    if (willDelete) {
      this.deleteProduct(item);
      this.router.navigateByUrl('');

      // document.getElementById('deleteOverlay').style.display = "none";
      // to refresh 
    }
    // if (window.confirm(item.Art + " in " + item.Groesse + " Liter Variante wirklich löschen?")) {
    //  
    //   // alert("erfolgreich gelöscht");
    // };
  }
}