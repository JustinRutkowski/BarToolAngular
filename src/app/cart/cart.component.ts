import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';
import { ProduktService } from '../produkt.service';
import { CommandExecutor } from 'selenium-webdriver/safari';
import { Overlay } from '@angular/cdk/overlay';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    @Input() overlay: any;
    cartItems: Produkt[];
    condition: Boolean = false;
    drinkMoney: HTMLInputElement;
    moneyReceived: HTMLInputElement;
    voucher: HTMLInputElement;
    voucherLeft: HTMLElement;
    change: HTMLElement;
    voucherAmount;
    voucherNumber;

    ngOnInit() {
        this.drinkMoney = <HTMLInputElement>document.getElementById("drinkMoney");
        this.moneyReceived = <HTMLInputElement>document.getElementById("moneyReceived");
        this.voucher = <HTMLInputElement>document.getElementById("voucher");
        this.voucherLeft = <HTMLElement>document.getElementById("voucherLeft");
        this.change = document.getElementById("change");
    }

    // todo
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
     ** displays the Paymentoverlay, copys current card to the overview, calculates the price sum 
     * @param container the whole container of the current cart
     */
    placeOrder() {
        var container = document.getElementById('containerNew');
        var item: HTMLButtonElement;
        var art;
        // reset fields
        this.change.innerHTML = "€";
        this.drinkMoney.value = null;
        this.moneyReceived.value = null;
        this.voucher.value = null;
        this.voucherLeft.innerHTML = "";

        document.getElementById('paymentOverlay').style.display = "block";
        this.moneyReceived.focus();

        var priceSum: number = 0;

        // TO-DO refactore in an Angular way
        // i=1 for skipping the heading of the container
        for (var i: number = 1; i < container.childElementCount; i++) {
            item = <HTMLButtonElement>container.children.item(i);

            var buttonText: string = item.innerHTML;
            console.log(buttonText);
            
            art = buttonText.split("|", 3)[0].trim();
            var quantity: string = buttonText.split("X")[0].split("|")[1];
            console.log(quantity);
            
            var price: string = item.value;
            console.log(price);
            

            var overviewItem = document.createElement('button');
            overviewItem.innerHTML = buttonText;
            overviewItem.className = item.className + " overView";
            overviewItem.style.backgroundColor = document.getElementById(art).style.backgroundColor;
            overviewItem.id = item.innerHTML;
            priceSum = priceSum + (+price * +quantity);
            if (document.getElementById(item.innerHTML) == null) {
                document.getElementById('cartOverview').appendChild(overviewItem);
            }
        }
        document.getElementById("price").innerHTML = priceSum.toFixed(2) + " €";


    }

    /**
     * calculate the fiels in the payment overlay
     * @param voucher voucher that the client might have
     * @param price sum of the products in the cart
     * @param change change money that the client receives
     * @param moneyReceived money that we got from the client to pay
     * @param drinkMoney money that the client voulentiery gives to us
     */
    calculateChange(voucher, price, change, moneyReceived, drinkMoney) {

        var voucherLeft = this.voucherLeft.innerHTML
        price = price.replace('€', '');
        change = change.replace('€', '');

        console.log("voucher: " + voucher);
        console.log("price: " + price);
        console.log("change: " + change);
        console.log("moneyReceived: " + moneyReceived);
        console.log("drinkMoney: " + drinkMoney);

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
            change = (+document.getElementById("change").innerHTML.replace('€', '')
                - drinkMoney).toFixed(2) + " €";
        }
        // Control when the order can be finished
        if ((moneyReceived >= +price || voucher + moneyReceived
            >= +price || voucher >= +price)) {

            this.condition = true;
            console.log("change: " + change);
            if (+change.replace('€', '') < 0) {

                this.condition = false;
            }
        } else {
            this.condition = false;
        }

        this.change.innerHTML = change;
        this.voucherLeft.innerHTML = voucherLeft;

    }

    /**
     ** sends the order to DB, resets the cart and overview, saves cart to previousCart 
     */
    finishOrder() {

        // gather all the things to send
        var BestellungsID;

        var overlay = document.getElementById('paymentOverlay');
        var containerNew = document.getElementById('containerNew');
        var containerOld = document.getElementById('containerOld');

        // fade-out animation and close the paymentOverlay
        containerOld.className = "cart slide-up";
        overlay.className = "overlay fade-out";
        setTimeout(() => {
            overlay.style.display = "none";
            overlay.className = "overlay fade-in";
        }, 275);

        localStorage.setItem("cartOld", JSON.stringify(this.overlay.cartProdukte));

        // copy the order to display the previous order
        this.overlay.cartProdukteOld = this.overlay.cartProdukte;


        // reset the cart for a new order
        this.overlay.cartProdukte = [];

        // reset the overview
        document.getElementById('cartOverview').innerHTML = "";
        this.condition = false;
    }
}
