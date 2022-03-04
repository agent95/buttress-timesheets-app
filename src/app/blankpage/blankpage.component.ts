import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blankpage',
  templateUrl: './blankpage.component.html',
  styleUrls: ['./blankpage.component.css']
})
export class BlankpageComponent implements OnInit {
  N: any;
  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  rout() {
    window.history.back();
  }
  index() {
    this.router.navigate(['/index'])
  }
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
  timesheet() {
    this.router.navigate(['/timesheet'])
  }
  profile() {
    this.router.navigate(['/profile'])
  }

  blankpage() {
    this.router.navigate(["/blankpage"]);
  }
  logout() {
    this.N = "z"
    this.toastr.success("logout successfully");
    localStorage.removeItem("token")
    this.router.navigate(['/verify', this.N]);
  }
}
