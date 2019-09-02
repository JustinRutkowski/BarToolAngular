import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  log;
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (localStorage.getItem("login") == undefined) {
      document.getElementById("login").style.display = "block";
      document.getElementById("logon").focus();
    }
  }

  _login(input) {
    console.log(input);
    localStorage.setItem("login", input);
  }

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
  }

}
