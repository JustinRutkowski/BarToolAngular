import { Component, OnInit } from '@angular/core';
import { ProduktService } from '../produkt.service';
import { Produkt } from '../produkt';
import { Observable } from 'rxjs';
import { Bestellung } from '../bestellung';
import { Router } from '@angular/router';
import { GoogleChartsModule } from 'angular-google-charts';

declare let google: any;

@Component({
  selector: 'auswertung',
  templateUrl: './auswertung.component.html',
  styleUrls: ['./auswertung.component.css']
})
export class AuswertungComponent implements OnInit {

  produkt: Produkt = new Produkt("", "", "", "");
  produkte: Produkt[];
  produkte2: Produkt[];
  bestellungen: Bestellung[]
  myWidth = "750"
  myWidth2 = "370"
  myHeight = "375"
  myData = new Array();
  myData2 = new Array();
  myType = "Bar";
  myType2 = "PieChart";
  myType3 = "Table";
  myTitle = "Verkaufte Größen"
  myTitle2 = "Umsätze nach Produkt"
  columnNames = ["Produkte", "verkaufte Menge", "Umsatz", "Kosten", "Gewinn"];
  columnNames2 = ["Produkte", "Umsatz"];
  myOptions = {
    is3D: true,
  };

  constructor(private produktService: ProduktService, private router: Router) {

  }

  // ngOnInit() {
  //   setTimeout(() => {
  //     google.charts.load('current', {
  //       packages: ['corechart', 'table', 'bar']
  //     });

  //     // google.charts.setOnLoadCallback(
  //     // });
  //     // google.charts.setOnLoadCallback(() => this.drawChart);
  //     // window.addEventListener('resize', () => {
  //     //   if (this.router.url === '/auswertung') {
  //     //     return this.drawChart();
  //     //   }
  //     // });
  //   }, 275);
  // }

  // drawChart() {
  //   const data = google.visualization.arrayToDataTable(this.myData);
  //   const chart = new google.visualization.LineChart(
  //     document.getElementById('chart'),
  //   );
  //   chart.draw(data, this.myOptions);
  // }

  ngOnInit() {
    setTimeout(() => {
      google.charts.load('current', { 'packages': ['bar', 'pie'] });
      this.getProdukte();
    }, 50);

    setTimeout(() => {
      this.drawChart();
    }, 300);
  }

  drawChart() {
    var dataBar = new google.visualization.DataTable();
    dataBar.addColumn('string', 'Produkte');
    dataBar.addColumn('number', 'verkaufte Menge');
    dataBar.addColumn('number', 'Umsatz');
    dataBar.addColumn('number', 'Kosten');
    dataBar.addColumn('number', 'Gewinn');

    dataBar.addRows(this.myData);

    const chartBar = new google.charts.Bar(document.querySelector('#barChart'));
    chartBar.draw(dataBar);

    //------------------------------------------------------------------------------------

    var dataPie1 = new google.visualization.DataTable();
    dataPie1.addColumn('string', 'Produkte');
    dataPie1.addColumn('number', 'Umsatz');

    dataPie1.addRows(this.myData2);

    const chartPie1 = new google.charts.Bar(document.querySelector('#pieChart1'));
    chartPie1.draw(dataPie1);

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
            this.myData.push([this.produkte2[i].Art, parseInt(this.produkte2[i].Menge), (produkt.Preis * parseInt(this.produkte2[i].Menge)), parseInt(produkt.Preis), parseInt(produkt.Preis)]);
            this.myData2.push([this.produkte2[i].Art, (parseInt(produkt.Preis) * parseInt(this.produkte2[i].Menge))])
          }
        }
      }
    );
  }
}
