import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  C: any;
  T: any;
  P: any;
  B: any;
  part: any;
  arr: any = [];
  arr2: any = [];
  arr3: any;
  a1: any;
  a2: any;
  a3: any = 0;
  ARR: any = [];
  public version: string = packageJson.version;
  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }
  rout() {
    window.history.back();
  }
  index() {
    this.router.navigate(['/index'])

  }
  clock() {
    if (localStorage.getItem("token") == null) {

      this.C = "c";
      // this.router.navigate(["/verify", this.C]);
      this.router.navigate(['/sign-in',this.C])

    }
    else {
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

  }
  timesheet() {
    if (localStorage.getItem("token") == null) {

      this.T = "t";
      // this.router.navigate(['/verify', this.T])
      this.router.navigate(['/sign-in',this.T])

    }
    else {
      this.router.navigate(['/timesheet'])
    }

  }
  profile() {
    if (localStorage.getItem("token") == null) {

      this.P = "p";
      // this.router.navigate(['/verify', this.P])
      this.router.navigate(['/sign-in',this.P])
    }
    else {
      this.router.navigate(['/profile'])
    }

  }
 
  blankpage() {
    if (localStorage.getItem("token") == null) {

      this.B = "b";
      // this.router.navigate(["/verify", this.B]);
      this.router.navigate(['/sign-in',this.B])

    }
    else {
      this.router.navigate(["/blankpage"]);

    }

  }


}








