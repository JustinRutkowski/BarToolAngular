import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduktService } from '../produkt.service';
import { Produkt } from '../produkt';
import { Observable } from 'rxjs';
import { Bestellung } from '../bestellung';
import { Router } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js';
import { ExcelService } from '../excel.service';
import swal from 'sweetalert';

declare let google: any;

@Component({
  selector: 'auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.css']
})
export class AuswertungComponent implements OnInit {
  chart = []; // This will hold our chart info
  produkt: Produkt = new Produkt("", "", "", "", "", "");
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
  date;
  login = localStorage.getItem("login");;
  check = false;
  Menge: number = 0;
  Umsatz: string = '0';
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // pieChartLabels = this.columnNames2;
  // pieChartType = 'pie';
  // elements: any = [];
  // headElements = this.columnNames;

  constructor(private produktService: ProduktService, private router: Router, private excelService: ExcelService) { }

  ngOnInit() {
    this.getProdukte();

    setTimeout(() => {
      google.charts.load('current', { 'packages': ['corechart'] });

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(this.drawChart());

      // for (let i = 0; i < this.myData.length; i++) {
      //   this.elements.push({ produkt: this.myData[i][0], Groesse: this.myData[i][1], Preis: this.myData[i][2], Menge: parseFloat(this.myData[i][3]), Umsatz: this.myData[i][4], Kosten: this.myData[i][5], Gewinn: this.myData[i][6] });
      // }
    }, 500);
  }

  ngAfterViewInit() {
    if (localStorage.getItem("check") == undefined) {
      setTimeout(() => {
        this.router.navigateByUrl("/");
      }, 100);
      setTimeout(() => {
        this.router.navigateByUrl("/auswertung");
      }, 100);
      localStorage.setItem("check", "1");
    }
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
    };
    var chart2 = new google.visualization.PieChart(document.getElementById('chart_div2'));
    chart2.draw(data2, options2);

    // !-----------------------------------------------------------------

    // Table Chart.
    var data3 = new google.visualization.DataTable();
    data3.addColumn('string', 'Produkt');
    data3.addColumn('string', 'Größe');
    data3.addColumn('string', 'Preis');
    data3.addColumn('number', 'Menge');
    data3.addColumn('string', 'Umsatz');
    data3.addColumn('string', 'Kosten');
    data3.addColumn('string', 'Gewinn');

    data3.addRows(this.myData);

    // Set chart options
    var options3 = {
      'width': 780,
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

        // get sum of selled amount per product
        for (var i = 0; i < this.produkte.length; i++) {
          this.produkte[i].Nutzer = localStorage.getItem("login");
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
              this.Menge = this.Menge + parseFloat(this.produkte2[i].Menge);
              this.Umsatz = (parseFloat(this.Umsatz) + parseFloat(produkt.Preis) * parseFloat(this.produkte2[i].Menge)).toFixed(2).toString().replace('.', ',');

              this.myData.push([this.produkte2[i].Art, (this.produkte2[i].Groesse).replace('.', ',') + " L", (parseFloat(produkt.Preis)).toFixed(2).toString().replace('.', ',') + " €", parseFloat(this.produkte2[i].Menge), (parseFloat(produkt.Preis) * parseFloat(this.produkte2[i].Menge)).toFixed(2).toString().replace('.', ',') + " €", (parseFloat(produkt.Einkaufspreis)).toFixed(2).toString().replace('.', ',') + " €", (parseFloat(produkt.Preis) * parseFloat(this.produkte2[i].Menge) - parseFloat(produkt.Einkaufspreis)).toFixed(2).toString().replace('.', ',') + " €"])

              this.myData2.push([(this.produkte2[i].Art + " " + this.produkte2[i].Groesse).toString().replace('.', ',') + " L", (parseFloat(produkt.Preis) * parseFloat(this.produkte2[i].Menge))]);

              this.myData3.push([(`${this.produkte2[i].Art} ${this.produkte2[i].Groesse} L`).replace('.', ','), parseFloat(this.produkte2[i].Menge)]);
            }
          }
        }
      }
    );
  }

  async confirm(data) {
    const willDelete = await swal({
      title: "Sitzung beenden?",
      text: "Aktuelle Sitzung beenden und Daten exportieren?",
      icon: "warning",
      buttons: ["Nein", "Ja"],
      dangerMode: true,
    });

    if (willDelete) {
      this.captureScreen(data);
      this.exportAsXLSX();
      this.deleteDBEntries(localStorage.getItem("login"));
      // document.getElementById('deleteOverlay').style.display = "none";
      // to refresh 
    }
  }
  captureScreen(data) {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var hours = String(today.getHours()).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');

    var time = hours + ":" + minutes;
    console.log(time);

    this.date = (dd + '.' + mm + '.' + yyyy + " | " + time);
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 220;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/svg')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 50;
      pdf.internal.scaleFactor = 30;
      pdf.addImage(contentDataURL, 'SVG', 0, position, imgWidth, imgHeight)
      pdf.text(70, 10, 'Sitzungsabrechnung BarTool');
      pdf.text(10, 30, `Nutzer: ${this.login}`);
      pdf.text(85, 30, `Gesamtumsatz: ${this.Umsatz}`);
      pdf.text(150, 30, `Gesamtmenge: ${this.Menge}`);
      pdf.text(75, 40, `Vom: ${this.date}`);
      pdf.save('BarTool_Abrechnung.pdf'); // Generated PDF   
    });
  }

  exportAsXLSX() {
    this.myData.unshift(["Produkt", "Größe", "Preis", "Menge", "Umsatz", "Kosten", "Gewinn", `Nutzer: ${this.login}`, `Vom: ${this.date}`])
    // var assocArray = [];
    // for (var i = 0; i < this.myData.length; i++) {
    //   var item = this.myData[i];
    //   assocArray.push(Array({
    //     Produkt: item[0],
    //     Größe: item[1],
    //     Preis: item[2],
    //     Menge: item[3],
    //     Umsatz: item[4],
    //     Kosten: item[5],
    //     Gewinn: item[6],
    //   }));
    // }
    // console.log(assocArray);
    this.excelService.exportAsExcelFile(this.myData, 'Sitzungsabrechnung BarTool');
  }

  deleteDBEntries(login) {

    this.produktService.deleteEntries(login).subscribe(
      (res: Produkt[]) => {

        localStorage.removeItem("login");
        localStorage.removeItem("check");
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 500);

      },
    );
  }
}

