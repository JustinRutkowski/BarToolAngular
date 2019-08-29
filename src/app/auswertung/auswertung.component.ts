import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduktService } from '../produkt.service';
import { Produkt } from '../produkt';
import { Observable } from 'rxjs';
import { Bestellung } from '../bestellung';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js';

declare let google: any;

@Component({
  selector: 'auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.css']
})
export class AuswertungComponent implements OnInit {
  chart = []; // This will hold our chart info
  produkt: Produkt = new Produkt("", "", "", "", "");
  produkte: Produkt[];
  produkte2: Produkt[];
  bestellungen: Bestellung[]
  myWidth = "780"
  myWidth2 = "780"
  myHeight = "325"
  myData = new Array();
  myData2 = new Array();
  myData3 = new Array();
  myType = "Bar";
  myType2 = "PieChart";
  myType3 = "Table";
  myTitle = "Verkaufte Mengen nach Produkt"
  myTitle2 = "Erzielte Umsätze nach Produkt"
  columnNames = ["Produkt", "Größe", "Preis", "Menge", "Umsatz", "Kosten", "Gewinn"];
  columnNames2 = ["Produkte", "Umsatz"];
  options;
  data;
  Menge: number = 0;
  Umsatz: number = 0;
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // pieChartLabels = this.columnNames2;
  // pieChartType = 'pie';
  // elements: any = [];
  // headElements = this.columnNames;

  constructor(private produktService: ProduktService) {

  }

  closeSession() { }

  ngOnInit() {
    this.getProdukte();

    setTimeout(() => {
      google.charts.load('current', { 'packages': ['corechart'] });

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(this.drawChart());

      // for (let i = 0; i < this.myData.length; i++) {
      //   this.elements.push({ produkt: this.myData[i][0], Groesse: this.myData[i][1], Preis: this.myData[i][2], Menge: parseInt(this.myData[i][3]), Umsatz: this.myData[i][4], Kosten: this.myData[i][5], Gewinn: this.myData[i][6] });
      // }
    }, 300);
  }

  drawChart() {
    // First Pie Chart.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Produkte');
    data.addColumn('number', 'Umsatz');
    data.addRows(this.myData2);

    // Set chart options
    var options1 = {
      'title': 'Produkte nach erzieltem Umsatz',
      'width': 780,
      'height': 325,
      'is3D': true,
      
    };
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options1);

    // !-----------------------------------------------------------------

    // Second Pie Chart.
    var data2 = new google.visualization.DataTable();
    // columnNames = ["Produkt", "Größe", "Preis", "Menge", "Umsatz", "Kosten", "Gewinn"];

    data2.addColumn('string', 'Produkte');
    data2.addColumn('number', 'Umsatz');
    data2.addRows(this.myData3);

    // Set chart options
    var options2 = {
      title: 'Produkte nach Anzahl verkaufter Mengen',
      width: 780,
      height: 325,
      is3D: true,

      animation: {
        startup: true,
        duration: 10000,
        easing: 'out',
      },
    };
    var chart2 = new google.visualization.PieChart(document.getElementById('chart_div2'));
    chart2.draw(data2, options2);

    // !-----------------------------------------------------------------

    // Table Chart.
    var data3 = new google.visualization.DataTable();
    data3.addColumn('string', 'Produkte');
    data3.addColumn('string', 'Größe in Liter');
    data3.addColumn('number', 'Preis in €');
    data3.addColumn('number', 'Menge');
    data3.addColumn('number', 'Umsatz in €');
    data3.addColumn('number', 'Kosten in €');
    data3.addColumn('number', 'Gewinn in €');

    data3.addRows(this.myData);

    // Set chart options
    var options3 = {
      'width': 780,
      'height': 325,
    };
    var chart3 = new google.visualization.Table(document.getElementById('chart_div3'));
    chart3.draw(data3, options3);
  }
  /**
   ** gets all the products in the products table
   */
  getProdukte() {
    this.produktService.getAll().subscribe(
      (res: Produkt[]) => {
        this.produkte = res;
        console.log(this.produkte);
        // get sum of selled amount per product
        for (var i = 0; i < this.produkte.length; i++) {
          this.getMenge(this.produkte[i]);
        }
      },
    );
  }

  /**
   ** gets the sum amount of sells for one product 
   * @param produkt the product the sum is calcualted for
   */
  getMenge(produkt) {
    this.produktService.getMenge(produkt).subscribe(
      (res: Produkt[]) => {
        this.produkte2 = res
        if (this.produkte2 != null) {
          for (var i = 0; i < this.produkte2.length; i++) {
            if (this.produkte2[i].Menge != null) {
              this.Menge = this.Menge + parseInt(this.produkte2[i].Menge);
              this.Umsatz = this.Umsatz + parseInt(produkt.Preis) * parseInt(this.produkte2[i].Menge);

              this.myData.push([this.produkte2[i].Art, this.produkte2[i].Groesse, parseInt(produkt.Preis), parseInt(this.produkte2[i].Menge), parseInt(produkt.Preis) * parseInt(this.produkte2[i].Menge), parseInt(produkt.Einkaufspreis), parseInt(produkt.Preis) * parseInt(this.produkte2[i].Menge) - parseInt(produkt.Einkaufspreis)])

              this.myData2.push([this.produkte2[i].Art + " " + this.produkte2[i].Groesse + " L", (parseInt(produkt.Preis) * parseInt(this.produkte2[i].Menge))]);

              this.myData3.push([`${this.produkte2[i].Art} ${this.produkte2[i].Groesse} L`, parseInt(this.produkte2[i].Menge)]);
            }
          }
        }
      }
    );
  }

  public captureScreen(data) {
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 20;

      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.text(70, 10, 'Produktabrechnung BarTool');

      pdf.save('BarTool_Abrechnung.pdf'); // Generated PDF   
    });
  }
}
