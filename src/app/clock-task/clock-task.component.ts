import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clock-task',
  templateUrl: './clock-task.component.html',
  styleUrls: ['./clock-task.component.css']
})
export class ClockTaskComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  clock() {
    if (localStorage.getItem("latestToken1") == null) {
      this.router.navigate(['/clock'])

    }
    else {
      if (localStorage.getItem("latestToken1") == "") {
        if (localStorage.getItem("time12") !== null) {
          this.router.navigate(['/clock-in'])

        }
        else if (localStorage.getItem("time12") == null) {
          this.router.navigate(['/clock-out'])

        }
        else {
          this.router.navigate(['/clock'])
        }
      }
      else {
        if (localStorage.getItem("time12") == null) {
          this.router.navigate(['/clock-out'])
        }
        else {

          this.router.navigate(['/clock-in'])
        }
      }
    }
  }
  rout(){
    window.history.back();}
  
}
