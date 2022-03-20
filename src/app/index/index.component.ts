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
  
}








