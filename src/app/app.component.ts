import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  routerLink: string;
  

  ngOnInit() {
    this.check();
  }
  check(){
    console.log(this.routerLink);
  }

}
