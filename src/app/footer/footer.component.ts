import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input() activeTab = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  index() { this.router.navigate(['/index']) }
  profile() { this.router.navigate(['/profile']) }
  clock() {
    if (localStorage.getItem("siteAddress") == null) {
      this.router.navigate(['/clock'])

    }
    else {
      if (localStorage.getItem("siteAddress") == "") {
        if (localStorage.getItem("siteTime") !== null) {
          this.router.navigate(['/clock-in'])

        }
        else if (localStorage.getItem("siteTime") == null) {
          this.router.navigate(['/clock-out'])

        }
        else {
          this.router.navigate(['/clock'])
        }
      }
      else {
        if (localStorage.getItem("siteTime") == null) {
          this.router.navigate(['/clock-out'])
        }
        else {

          this.router.navigate(['/clock-in'])
        }
      }
    }
  }
  timesheet() { this.router.navigate(['/timesheet']) }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(["/verify"]);
  }
  gotoHome() {
    this.router.navigate(["/index"]);
  }
  gotoClock() {
    this.router.navigate(["/clock"]);
  }
  rout() {
    window.history.back();
  }
  blankpage() {
    this.router.navigate(["/blankpage"]);
  }

}
