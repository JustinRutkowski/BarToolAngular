import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';
import { ProduktService } from '../produkt.service';
import { Bill } from './bill';
import { Relation } from './relation';

@Component({
    selector: 'cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    @Input() overlay: any;
    @Input() cartItems: Produkt[];
    condition: Boolean = false;
    drinkMoney: HTMLInputElement;
    moneyReceived: HTMLInputElement;
    voucher: HTMLInputElement;
    voucherLeft: HTMLElement;
    change: HTMLElement;
    voucherAmount;
    voucherNumber;
    error = "";
    bill = new Bill("", "", "", "", "", "", "");
    produkt: Produkt = new Produkt("", "", "", "", "", "");
    relation = new Relation("", "", "", "");
    val: HTMLInputElement;
    input: number = 0;
    drinkMoneymode: boolean = false;
    previous: boolean;
    gutscheinnummer: HTMLInputElement;

    constructor(private produktService: ProduktService) { };

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
        this.condition = false;
        this.input = 0;
        this.gutscheinnummer = <HTMLInputElement>document.getElementById("voucherNumber");
        this.gutscheinnummer.value = '';
        document.getElementById("Restbetrag").innerHTML = '';

        setTimeout(() => {
            overlay.style.display = "none";
            overlay.className = "overlay fade-in";
        }, 275);
    }

    ngAfterViewInit() {
        if (this.val != undefined) {
            this.val.value = "0";
        }
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

    deleteInput(voucher ,price, change ,moneyReceived, drinkMoney, btnSwitch) {
        moneyReceived.value = '';
        drinkMoney.value = '';
        this.input = 0;
        document.getElementById("change").innerHTML = this.change.innerHTML;
        this.drinkMoneymode = false;
        this.switchText(btnSwitch);

        this.calculateChange(voucher ,price, change ,moneyReceived.value, drinkMoney.value);
    }

    inputMoney(value) {
        if (this.drinkMoneymode == false) {
            this.val = <HTMLInputElement>document.getElementById("moneyReceived");
        } else {
            this.val = <HTMLInputElement>document.getElementById("drinkMoney");
        }
        this.val.value = (this.input + parseFloat(value)).toFixed(2);
        this.input = parseFloat(this.val.value);
    }

    switchText(btnSwitch) {
        if (this.drinkMoneymode == true) {
            btnSwitch.innerHTML = "Geld eingeben";
            btnSwitch.style.color = "#5bc0de"
        } else {
            btnSwitch.innerHTML = "Trinkgeld eingeben";
            btnSwitch.style.color = "rgb(40, 167, 69)"
        }
    }

    /**
     ** displays the Paymentoverlay, copys current card to the overview, calculates the price sum 
     * @param container the whole container of the current cart
     */
    placeOrder() {
        this.drinkMoneymode = false;
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
        // this.moneyReceived.focus();

        var priceSum: number = 0;
        document.getElementById('cartOverview').innerHTML = '';
        // TO-DO refactore in an Angular way
        // i=1 for skipping the heading of the container
        for (var i: number = 1; i < container.childElementCount; i++) {
            item = <HTMLButtonElement>container.children.item(i);

            var buttonText: string = item.innerHTML;

            art = buttonText.split("|", 3)[0].trim();
            var quantity: string = buttonText.split("X")[0].split("|")[1];

            var price: string = item.value;

            var overviewItem = document.createElement('button');
            overviewItem.innerHTML = buttonText;
            overviewItem.className = item.className + " overView";
            overviewItem.style.backgroundColor = "white";
            overviewItem.id = item.innerHTML + " ov";
            priceSum = priceSum + (+price * +quantity);



            if (document.getElementById(item.innerHTML) == null) {
                document.getElementById('cartOverview').appendChild(overviewItem);
            }
        }
        document.getElementById("price").innerHTML = priceSum.toFixed(2).replace('.', ',') + " €";
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
        this.gutscheinnummer = <HTMLInputElement>document.getElementById("voucherNumber");


        var bool = this.gutscheinnummer.disabled;

        if (bool == true) {
            this.gutscheinnummer.innerHTML = '';
            this.voucherNumber = '';
        }

        var voucherLeft;
        var voucherLeftShow = this.voucherLeft.innerHTML;
        price = price.replace('€', '');
        price = price.replace(',', '.');
        change = change.replace('€', '');

        // console.log("voucher: " + voucher);
        // console.log("price: " + price);
        // console.log("change: " + change);
        // console.log("moneyReceived: " + moneyReceived);
        // console.log("drinkMoney: " + drinkMoney);
        if (drinkMoney != 0) {
            change = (+document.getElementById("change").innerHTML.replace('€', '').replace(',', '.')
                - drinkMoney).toFixed(2) + " €";
        }

        if (voucher != 0) {
            voucherLeft = (voucher - +price).toFixed(2) + " €";
            // console.log("voucherLeft: " + voucherLeft);
            if (+voucherLeft.replace('€', '') >= 0) {
                document.getElementById("Restbetrag").innerHTML = "Gutscheinrest:"
                voucherLeftShow = voucherLeft;
                change = (moneyReceived - - +voucherLeft.replace('€', '') - drinkMoney).toFixed(2).replace('.', ',') + " €";
            }
            if (+voucherLeft.replace('€', '') < 0) {
                document.getElementById("Restbetrag").innerHTML = "noch zu zahlen:"
                voucherLeftShow = (parseFloat(voucherLeft) * -1).toFixed(2).replace('.', ',') + " €";
                change = (moneyReceived - - +voucherLeft.replace('€', '') - drinkMoney).toFixed(2).replace('.', ',') + " €";
            }
        }
        else {
            voucherLeft = "";
            document.getElementById("Restbetrag").innerHTML = "";
            change = (moneyReceived - +price - drinkMoney).toFixed(2).replace('.', ',') + " €";
        }

        // Control when the order can be finished
        if ((moneyReceived >= +price || voucher + moneyReceived
            >= +price || voucher >= +price)) {

            this.condition = true;
            document.getElementById("change").style.color = "white";

            if (+change.replace('€', '').replace(',', '.') < 0) {
                document.getElementById("change").style.color = "red";
                this.condition = false;
            }
        } else {
            this.condition = false;
            document.getElementById("change").style.color = "red";
        }

        this.change.innerHTML = change;
        this.voucherLeft.innerHTML = voucherLeftShow;
        this.bill.Bestellungspreis = price;
        this.bill.Gelderhalten = moneyReceived;
        this.bill.Gutscheinwert = voucher;
        this.bill.Gutscheinnummer = this.gutscheinnummer.value;
        this.bill.Rueckgeld = change;
        this.bill.Trinkgeld = drinkMoney;
        this.bill.Nutzer = localStorage.getItem("login");
    }

    /**
     ** sends the order to DB, resets the cart and overview, saves cart to previousCart 
     */
    finishOrder() {

        var overlay = document.getElementById('paymentOverlay');
        var containerOld = document.getElementById('containerOld');

        // fade-out animation and close the paymentOverlay
        containerOld.className = "cart slide-up";
        overlay.className = "overlay fade-out";
        setTimeout(() => {
            overlay.style.display = "none";
            overlay.className = "overlay fade-in";
        }, 275);

        localStorage.setItem("cartOld", JSON.stringify(this.overlay.cartProdukte));

        this.order(this.bill)

        // copy the order to display the previous order
        this.overlay.cartProdukteOld = this.overlay.cartProdukte;

        // reset the overview
        document.getElementById('cartOverview').innerHTML = "";
        this.condition = false;
        this.input = 0;
        this.gutscheinnummer = <HTMLInputElement>document.getElementById("voucherNumber");
        this.gutscheinnummer.value = '';
        document.getElementById("Restbetrag").innerHTML = '';
    }

    order(bill) {
        this.produktService.order(bill).subscribe(
            (res: Produkt[]) => {
                for (var i = 0; i < this.overlay.cartProdukte.length; i++) {
                    this.order2(this.bill, this.overlay.cartProdukte[i])
                }

                // reset the cart for a new order
                this.overlay.cartProdukte = [];
            },
            (err) => {
                this.error = err;
            }
        );
    }

    order2(bill: Bill, produkt: Produkt) {
        this.produktService.getBill(bill).subscribe(
            (res: string) => {

                this.relation.BestellungsID = res[0]['MAX(BestellungsID)'];
                this.produktService.getProdukt(produkt).subscribe(
                    (res: string) => {
                        this.relation.ProdukteID = res;
                        this.relation.Nutzer = localStorage.getItem("login");
                        this.relation.Menge = produkt.Menge;
                        this.produktService.relateOrderAndProduct(this.relation).subscribe(
                            (res: string) => {
                            },
                            (err) => {
                                this.error = err;
                            }
                        );
                    },
                    (err) => {
                        this.error = err;
                    }
                );
            },
            (err) => {
                this.error = err;
            }
        );



    }

}
