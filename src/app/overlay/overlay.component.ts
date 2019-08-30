import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})

/**
 * the basic Overlay where you can choose the size and quantity of the selected product
 */
export class OverlayComponent implements OnInit {
  @Input() produkte: Produkt[];
  // @Input() cartProdukte: Produkt[];
  error = '';
  selected = '1';
  cartProdukte: Produkt[] = new Array();
  cartProdukteOld: Produkt[] = new Array();

  /**
   ** fades out an overlay 
   * @param overlay the overlay to fade
   */
  off(overlay: HTMLElement) {
    overlay.className = "overlay fade-out";
    setTimeout(() => {
      overlay.style.display = "none";
      overlay.className = "overlay fade-in";
    }, 275);
    this.selected = '1';
  }

  ngOnInit() {
    this.cartProdukteOld = JSON.parse(localStorage.getItem("cartOld"));
  }

  /**
   ** gets the color of the productbutton via id
   * @param Art the name of the product to select via id
   */
  getColorFromExistingItem(Art: string) {
    if (document.getElementById(Art) != null) {
      var res = { 'backgroundColor': `${document.getElementById(Art).style.backgroundColor}` };
    }
    return res;
  }

  /**
   ** displays the Overlay if you click on a product wich is in the current cart
   * @param buttonItem the product as the HTMLButtonElement
   * @param cartItem the product in the cart
   */
  cartItemOverlayOn(containerNew, buttonItem: HTMLButtonElement, cartItem: Produkt) {    
    var cartItemOverlay = document.getElementById("cartItemOverlay");
    cartItemOverlay.style.display = "block";
    document.getElementById("title2").innerText = cartItem.Art;
    var this2 = this;
    var deleteButton: HTMLElement = document.getElementById('deleteButton');
    var editButton = document.getElementById('editButton');

    // todo Refactor anmiation with Angular Anmiation
    deleteButton.onclick = function () {
      containerNew.className = "cart slide-down";
      this2.off(cartItemOverlay)
      setTimeout(() => {
        let id = buttonItem.innerHTML + " ov" 
        document.getElementById(id).remove()
        this2.cartProdukte.splice(this2.cartProdukte.indexOf(cartItem), 1)
        containerNew.className = "cart slide-up";
      }, 275);
    }

    editButton.onclick = function () {
      containerNew.className = "cart slide-down";
      this2.off(cartItemOverlay)
      setTimeout(() => {
        let id = buttonItem.innerHTML + " ov" 
        document.getElementById(id).remove()
        this2.cartProdukte.splice(this2.cartProdukte.indexOf(cartItem), 1)
        containerNew.className = "cart slide-up";
      }, 275);
      document.getElementById("title").innerText = cartItem.Art;
      document.getElementById("overlay").style.display = "block";
    }
  }

  /**
   ** method to add items to the shopping cart
   ** also for the functions of the cartItemOverlay
   * @param item the item to add
   * @param amount the quantity of the item
   */
  addToCart(item: Produkt, amount: number) {
    var sizeAndQuantityOverlay: HTMLElement = document.getElementById('overlay');
    item.Menge = amount.toString();
    this.cartProdukte.push(item);
    this.off(sizeAndQuantityOverlay);
    localStorage.setItem("cart", JSON.stringify(item));
  }
}