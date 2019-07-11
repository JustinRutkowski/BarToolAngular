import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';
import { ProduktService } from '../produkt.service';
import { CommandExecutor } from 'selenium-webdriver/safari';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    cartItems: Produkt[];
    condition: Boolean = false;

    off(overlay: HTMLElement) {
        overlay.className = "overlay fade-out";
        setTimeout(() => {
            overlay.style.display = "none";
            overlay.className = "overlay fade-in";
        }, 250);
    }

    /**
     * Checks if the current cart is empty to disable the order button
     */
    checkEmpty() {
        if (document.getElementById('containerNew').childElementCount == 1) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @param container the whole container of the current cart
     */
    placeOrder(container: HTMLCollectionOf<HTMLButtonElement>) {

        // reset fields
        document.getElementById("change").innerHTML = "€";
        document.getElementById("drinkMoney").value = null;
        document.getElementById("moneyReceived").value = null;
        document.getElementById("voucher").value = null;
        document.getElementById("voucherLeft").innerHTML = "";

        document.getElementById('placeOrderOverlay').style.display = "block";
        document.getElementById('moneyReceived').focus();

        var priceSum: number = 0;
        for (var i: number = 1; i < container.childElementCount; i++) {
            var item: HTMLButtonElement = container.children.item(i);

            var buttonText: string = item.innerHTML;
            var quantity: string = buttonText.split("|", 3)[1];
            var price: string = item.value;

            var overviewItem = document.createElement('button');
            overviewItem.innerHTML = buttonText;
            overviewItem.className = item.className + " overView";
            overviewItem.style.background = item.style.background;
            overviewItem.id = item.innerHTML;
            priceSum = priceSum + (+price * +quantity);
            if (document.getElementById(item.innerHTML) == null) {
                document.getElementById('cartOverview').appendChild(overviewItem);
            }
        }
        document.getElementById("price").innerHTML = priceSum.toFixed(2) + " €";


    }

    /**
     * 
     */
    calculateChange() {

        var price = document.getElementById("price").innerHTML.replace('€', '');
        var moneyReceived = document.getElementById("moneyReceived").value;
        var voucher = document.getElementById("voucher").value;
        var voucherLeft = document.getElementById("voucherLeft").innerHTML
        var drinkMoney = document.getElementById("drinkMoney").value;
        var change = document.getElementById("change").innerHTML

        console.log("voucher: " + voucher);

        console.log("price: " + price);

        if (voucher != 0) {
            voucherLeft = (voucher - +price).toFixed(2) + " €";
            console.log("voucherLeft: " + voucherLeft);
            if (+voucherLeft.replace('€', '') >= 0) {
                document.getElementById("Restbetrag").innerHTML = "Rest vom Gutschein:"
                change = "0.00 €";
            }
            if (+voucherLeft.replace('€', '') < 0) {
                document.getElementById("Restbetrag").innerHTML = "noch zu zahlen:"
                change = (moneyReceived - - +voucherLeft.replace('€', '')).toFixed(2) + " €";
            }
        }
        else {
            voucherLeft = "";
            change = (moneyReceived - +price).toFixed(2) + " €";
        }

        if (drinkMoney != 0) {
            change = (+document.getElementById("change").innerHTML.replace('€', '') - drinkMoney).toFixed(2) + " €";
        }
        // Control when the order can be finished
        if ((moneyReceived >= +price || voucher + moneyReceived >= +price || voucher >= +price)) {

            this.condition = true;
            console.log("change: " + change);
            if (+change.replace('€', '') < 0) {

                this.condition = false;
            }
        } else {
            this.condition = false;
        }

        document.getElementById("change").innerHTML = change;
        document.getElementById("voucherLeft").innerHTML = voucherLeft;

    }

    /**
     * 
     */
    finishOrder() {

        // gather all the things to send
        var BestellungsID;
        // var user = document.getElementById("login").innerHTML;

        console.log("passed");

        var overlay = document.getElementById('placeOrderOverlay');
        var containerNew = document.getElementById('containerNew');
        var containerOld = document.getElementById('containerOld');

        
        containerOld.className = "cart slide-up";
        overlay.className = "overlay fade-out";
        setTimeout(() => {
            overlay.style.display = "none";
            overlay.className = "overlay fade-in";
        }, 450);

      

        var currentCart = document.createElement('h3');
        var currentCart2 = document.createElement('h3');

        currentCart.innerHTML = "aktuelle Bestellung";
        currentCart2.innerHTML = "letzte Bestellung";

        containerOld.innerHTML = "";
        containerOld.appendChild(currentCart2);


        for (var i: number = 1; i <= containerNew.childElementCount; i++) {
            console.log(containerNew.children.item(i));
            document.getElementById('containerOld').append(containerNew.children.item(i));
        }

        containerNew.innerHTML = "";
        containerNew.appendChild(currentCart);

        document.getElementById('cartOverview').innerHTML = "";

        this.condition = false;
    }
}
