import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';
import { ProduktService } from '../produkt.service';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})

export class OverlayComponent {
  @Input() produkte: Produkt[];
  selected = '1';
  error = '';
  success = '';

  /**
   * controlls fading of overlays
   * @param overlay the overlay to show
   */
  off(overlay: HTMLElement) {
    overlay.className = "overlay fade-out";
    setTimeout(() => {
      overlay.style.display = "none";
      overlay.className = "overlay fade-in";
    }, 450);
    this.selected = '1';

  }

  /**
   ** method to add items to the shopping cart
   ** also for the functions of the cartItemOverlay
   * @param item the item to add
   * @param amount the quantity of the item
   */
  cart(item: Produkt, amount: number) {

    var this2 = this;

    var title = document.getElementById("title");
    var currentCart = document.getElementById("containerNew");
    var deleteButton: HTMLElement = document.getElementById('delete');
    var editButton: HTMLElement = document.getElementById('edit');
    var cartItemOverlay: HTMLElement = document.getElementById('cartItemOverlay');
    var sizeAndQuantityOverlay: HTMLElement = document.getElementById('overlay');
    // Button creation for fixed amount on the single cart item
    var cartItem: HTMLButtonElement = document.createElement("button");

    // CSS Class has to be in global
    cartItem.className = "cartItem";
    cartItem.innerText = item.Art + " | " + amount + " | " + item.Groesse + " Liter";
    cartItem.value = item.Preis;
    currentCart.append(cartItem);

    // set the color from the productbuttons
    cartItem.style.background = document.getElementById(item.Art).style.backgroundColor;

    cartItem.onclick = function () {

      cartItemOverlay.style.display = "block";

      /**
       * delete button for individual product 
       */
      deleteButton.onclick = function () {
        currentCart.className = "cart slide-down";
        this2.off(cartItemOverlay)
        setTimeout(() => {
          cartItem.remove();
          if (document.getElementById(cartItem.innerText) != null) {
            document.getElementById(cartItem.innerText).remove();
          }
          currentCart.className = "cart slide-up";
        }, 450);
      }

      /**
       * edit button for individual product
       */
      editButton.onclick = function () {
        currentCart.className = "cart slide-down";
        this2.off(cartItemOverlay)
        setTimeout(() => {
          cartItem.remove();
          if (document.getElementById(cartItem.innerText) != null) {
            document.getElementById(cartItem.innerText).remove();
          }
          currentCart.className = "cart slide-up";
        }, 450);
        // print the name of the Product on top of the overlay
        title.innerText = item.Art;
        sizeAndQuantityOverlay.style.display = "block";
      }
    };
    // setting the default quantity to 1
    this.selected = '1';
    this.off(sizeAndQuantityOverlay);
  }
}