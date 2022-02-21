import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthguardServiceService, Product } from '../authguard-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg: any;
  data: any;
  param: any;
  product:any;
  loginform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private router: Router, private authguardservice: AuthguardServiceService) {
    // const param = {
    //   "email": this.eml,
    //   "password": this.psd
    // }
  }
  user = '1';
  ngOnInit(): void {
    // localStorage.setItem('sessionUser', this.user);
    // this.getProducts();

  }
  check(email: string, password: string) {
    this.param = { 'email': this.loginform.get("email")!.value, 'password': this.loginform.get("password")!.value }
    // var output = this.authguardservice.value(email, password);
    if (email !== "" && password !== "") {
      this.router.navigateByUrl('/index');
      console.log(this.param);
      // this.authguardservice.addProduct(this.param).subscribe((result: any) => {
      //   this.data = result;
      //   console.log(result)
      // })
      // localStorage.setItem('sessionUser', email);
    }
    else {
      this.msg = 'plese enter email and password..!'
    }
  }
  
  // eml: any;
  // psd: any;
  // click(e: string, p: string) {
  //   // var i=this.authguardservice.value(e,p);
  //   if (e != "" && p != "") {
  //     this.router.navigate(['/index']);
  //   }
  //   else {
  //     this.msg = "plese enter email"
  //   }
  //   this.eml = e;
  //   this.psd = p;
  //   console.log(this.eml)
  //   console.log(this.psd)
  // }

  
  products: Product[] = [];
  
  // getProducts(): void {
  //   this.authguardservice.getProducts().subscribe((resp: any) => {
  //     this.products = resp;
  //     console.log(this.products);
  //   });
  // }

}
