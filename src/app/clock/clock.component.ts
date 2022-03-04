import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ToastrService } from 'ngx-toastr';
import { AuthguardServiceService } from '../authguard-service.service';
import { BarcodeFormat, Result } from '@zxing/library';
// import moment from 'moment';
// import moment from 'moment-timezone';
// import moment from 'moment';
import * as moment from 'moment';
import 'moment-timezone';
@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
  @ViewChild('scanner')
  scanner!: ZXingScannerComponent;
  hasDevices!: boolean;
  hasPermission!: boolean;
  qrResultString!: string;
  qrResult!: Result;
  scan: boolean = false;
  availableDevices!: MediaDeviceInfo[];
  currentDevice!: MediaDeviceInfo;
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128, BarcodeFormat.DATA_MATRIX /*, ...*/];
  valu: any;
  valu2: any;
  param: any;
  id: any;
  sitecode: any;
  sitename: any;
  sitetime: any;
  consId: any = "";
  comment: any;
  invalidComment: any;
  scanImage: any;
  videoRef: any;
  newarr: any = [];
  newarr2: any = [];
  statement: boolean = false;
  invalidComment2: any;
  latestToken: any;
  currentTime: any;
  currentTime2: any;
  ar1: any;
  ar2: any;

  N: any;
  lat = -33.865143;

  long = 151.209900;

  zoom = 7;

  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';

  currentLocation: any;
  currentAddress: any;

  clockDataForm = new FormGroup({
    location1: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    enterCode: new FormControl('', [Validators.required]),
  });

 
  placesOptions: any;

  get address() {
    return this.clockDataForm.get('address');
  }
  get enterCode() {
    return this.clockDataForm.get('enterCode');
  }

  constructor(private router: Router, private service: AuthguardServiceService, private toastr: ToastrService, public datepipe: DatePipe) { }

  ngOnInit(): void {
     this.placesOptions= {componentRestrictions:{country: 'AU'}};
    // this.videoRef = document.getElementById('video');
    // console.log('hwlo', this.videoRef);
    // // this.valu={}

/* HIDDEN FOR PHASE 1
    this.service.getData().subscribe((res: any) => {
      this.valu = res.data;
      for (let i = 0; i < this.valu.length; i++) {
        this.valu[i].lat = this.valu[i].location[0];
        this.valu[i].long = this.valu[i].location[1];
      }
      console.log("Sites: ", this.valu)

      this.id = res.data[1] && res.data[1]._id;
      this.sitecode = res.data[1] && res.data[1].site_code;
      console.log("id: ",this.id, "sitecode: ", this.sitecode)
    })
  */
    
   
    /* HIDDEN FOR PHASE 1
    this.scanner?.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;

    });

    this.scanner?.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner?.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner?.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  */

    this.getMyLocation();
  }

  async getMyLocation(){
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.currentLocation = pos;
          
          let geocoder = new google.maps.Geocoder();
          
          geocoder
          .geocode({location: pos},(response) => {
            this.currentAddress = response[0].formatted_address;
            })
        }
      );
    } else {
      console.log('not supported');
    }
  }

  setCurrentAddress(){
    this.clockDataForm.patchValue({
      "address": this.currentAddress,
    })
  }

  handleQrCodeResult(resultString: any) {
    console.debug('Result: ', resultString);
    // const final_value = JSON.parse(resultString)
    // this.qrResultString = 'name: ' + final_value.name + ' age: ' + final_value.age;
    this.qrResultString = resultString;
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

  profile() {

    this.router.navigate(['/profile'])

  }
  timesheet() {

    this.router.navigate(['/timesheet'])

  }



  closemodal1() {
    let myDialog: any = document.getElementById("exampleModal12");
    myDialog.close('exampleModal12');
  }

  closemodal2() {
    let myDialog: any = document.getElementById("exampleModal13");
    myDialog.close('exampleModal13');
  }

  validComment(C: any) {
    if (C !== "") {
      this.comment = "";
      this.invalidComment = "";
    }
  }
  validComment2(A: any) {
    if (A !== "") {
      this.comment = "";
      this.invalidComment = "";
      this.invalidComment2 = "";

    }
  }

  check(){
    this.sendData()
  }
/*
  zz_check() {
  // if no address or sitecode
    if (this.address?.invalid && this.enterCode?.invalid) {
      this.sendData();
    }
    else {
      for (let i = 0; i < this.valu.length; i++) {
        if (this.valu[i].site_code == this.clockDataForm.value.enterCode || this.valu[i].site_address == this.clockDataForm.value.address) {
          this.ar1 = this.valu[i];
        }
      }
      if ((this.ar1 != undefined && this.ar1.site_induction) || (this.ar1 != undefined && this.ar1.safety_briefing)) {

        if (this.ar1.site_induction !== "" && this.ar1.safety_briefing !== "") {
          this.newarr2 = this.ar1.safety_briefing.split(".")
          let myDialog: any = document.getElementById("exampleModal13");
          myDialog.showModal();
        }
        else if (this.ar1.site_induction !== "" && this.ar1.safety_briefing == "") {
          this.newarr = this.ar1.site_induction.split(".")
          let myDialog: any = document.getElementById("exampleModal12");
          myDialog.showModal();
        }

        else if (this.ar1.site_induction == "" && this.ar1.safety_briefing !== "") {
          this.newarr2 = this.ar1.safety_briefing.split(".")
          let myDialog: any = document.getElementById("exampleModal13");
          myDialog.showModal();
        }
        else if (this.ar1.site_induction == "" && this.ar1.safety_briefing == "") {
          this.sendData();
        }
      }
      else {
        this.sendData();
      }
    }
   
  }
*/

  nextSkip() {
    for (let i = 0; i < this.valu.length; i++) {
      if (this.valu[i].site_code == this.clockDataForm.value.enterCode || this.valu[i].site_address == this.clockDataForm.value.address) {
        if (this.valu[i].site_induction) {
          if (this.valu[i].site_induction !== "") {
            this.newarr = this.ar1.site_induction.split(".")
            console.log("newarr", this.newarr)
            let myDialog2: any = document.getElementById("exampleModal13");
            myDialog2.close('exampleModal13');
            let myDialog: any = document.getElementById("exampleModal12");
            myDialog.showModal();
          }
        }

        else {
          this.sendData();
        }
      }
    }

  }




  rout() {
    this.router.navigate(['/index'])

  }


  fillAddress(add: any) {
    console.log(add);
    this.clockDataForm.patchValue({
      'location1': add.site_name,
      "address": add.site_address,
    })
    this.scanImage = add.qr_code;
  }

  logout() {
    this.N = ""
    this.toastr.success("logout successfully");
    localStorage.removeItem("token")
    this.router.navigate(['/verify', this.N]);
  }
  blankpage() {

    this.router.navigate(["/blankpage"]);

  }

  sendData(){
    const getTime = new Date().getTime();
    const currentTIME = this.datepipe.transform(getTime, 'yyyy-MM-ddTHH:mm:ss');
    const timezone = moment.tz.guess();

    const clockData = {
      "address": this.clockDataForm.get('address')!.value,
      "start_time": currentTIME,
      "time_zone":timezone,
    }

    this.service.postClockIn(clockData).subscribe((res: any) => {
      // this.valu2 = res;
      // console.log('postClockinRes',res);

      if(res.status){
        // this.toastr.success("Starting the timer");
        const sitename = res.data.site_Name;
        const sitetime = res.data.start_time;

        localStorage.setItem("siteAddress", clockData.address);
        localStorage.setItem("siteTime", sitetime);
        localStorage.setItem("siteName", sitename ?? clockData.address);
       
        this.router.navigate(['/clock-in'])
      } else {
        this.toastr.error(res.message);
      }

      /*
      if (res.status == true) {
        if (this.consId.code) {
          localStorage.setItem("siteAddress", this.consId.code);
        }
        else {
          localStorage.setItem("siteAddress", this.consId.address);
        }

        this.toastr.success("Your timer start for this site");
        console.log("RESPONSE", this.valu2)
        this.sitename = res.data.site_Name;
        this.sitetime = res.data.start_time;
        localStorage.setItem("siteTime", this.sitetime)
        localStorage.setItem("time13", this.sitename)

        console.log(this.sitename)
        console.log(this.sitetime)
        this.router.navigate(['/clock-in'])
      } else {

        this.toastr.error(res.message);
      }*/
    })
    
  }

  /*
  zz_sendData() {

    const currentTIME = new Date().getTime();
    const currentTIME3 = this.datepipe.transform(currentTIME, 'yyyy-MM-ddTHH:mm:ss')
    const timezone = moment.tz.guess();

    if ((this.ar1 != undefined && this.ar1.site_induction) || (this.ar1 != undefined && this.ar1.safety_briefing)) {
      let myDialog: any = document.getElementById("exampleModal12");
      myDialog.close('exampleModal12');
    }

    if (this.clockDataForm.value.address != "") {
      this.consId = {
        "address": this.clockDataForm.get('address')!.value,
        "start_time": currentTIME3,
        "time_zone":timezone,
      }

    }
    else if (this.clockDataForm.value.enterCode != "") {
      this.consId = {
        "code": this.clockDataForm.get('enterCode')!.value,
        "start_time": currentTIME3,
        "time_zone":timezone,

      }

    }
    else if (this.clockDataForm.value.address != "" && this.clockDataForm.value.enterCode != "") {
      this.consId = {
        "code": this.clockDataForm.get('enterCode')!.value,
        "start_time": currentTIME3,
        "time_zone":timezone,

      }

    }
    else if (this.clockDataForm.value.address == "" && this.clockDataForm.value.enterCode == "") {
      this.consId = {
        "code": this.clockDataForm.get('enterCode')!.value,
        "start_time": currentTIME3,
        "time_zone":timezone,

      }
    }
    

    // if (this.address?.invalid && this.enterCode?.invalid) {
    //   this.comment = "required at least one of them 'address' or 'code'!"
    // }
    this.service.postClockIn(this.consId).subscribe((res: any) => {
      this.valu2 = res;
      // localStorage.setItem("latestToken",this.consId);
      if (res.status == true) {
        if (this.consId.code) {
          localStorage.setItem("siteAddress", this.consId.code);
        }
        else {
          localStorage.setItem("siteAddress", this.consId.address);
        }

        this.toastr.success("Your timer start for this site");
        console.log("RESPONSE", this.valu2)
        this.sitename = res.data.site_Name;
        this.sitetime = res.data.start_time;
        localStorage.setItem("siteTime", this.sitetime)
        localStorage.setItem("time13", this.sitename)

        console.log(this.sitename)
        console.log(this.sitetime)
        this.router.navigate(['/clock-in'])
      } else {

        this.toastr.error(res.message);
      }
    })
  }

*/

  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
  }
  // setupCamera() {
  //   navigator.mediaDevices.getUserMedia({
  //     video: { width: 300, height: 250 },
  //   }).then(stram => {
  //     console.log(stram);
  //     this.videoRef.srcObject = stram;
  //   })

  // }
}


