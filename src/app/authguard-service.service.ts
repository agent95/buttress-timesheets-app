import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable, OperatorFunction, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService {
  pipe(arg0: MonoTypeOperatorFunction<unknown>, arg1: OperatorFunction<unknown, boolean>): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }
  //  value(email:string,password:string){
  //    return true;
  //  }
  resData: any;
  getapi() {
    const url = "https://jsonplaceholder.typicode.com/albums";
    this.http.get(url).subscribe(res =>
      this.resData = res)
    console.log(this.resData)
  }
  // gettoken() {
  //   return !localStorage.getItem("sessionUser");
  // }
  value(_email: string, _password: string) {
    return true;
  }


  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }


  // private extractData(res:any): any {
  //   const body = res;
  //   return body || { };
  // }

  // getProduct(id: string): Observable<any> {
  //   return this.http.get(this.url + 'getProfile' + id).pipe(
  //     map(this.extractData),
  //     catchError(this.handleError)
  //   );
  // }
  user = new BehaviorSubject(null);

  //locolhost 
  // url = "http://127.0.0.1:3030/api/";
  url="http://167.99.10.209:3030/api/";

  postLogin(nums: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " });
    const requestOptions = { headers: header };
    return this.http.post(this.url + 'mobileLogin', nums, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(param: any): Observable<any> {
    return this.http.post(this.url + 'insertUser', param).pipe(
      catchError(this.handleError)
    );
  }
  updateProduct(): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.get(this.url + 'getProfile', requestOptions).pipe(
      catchError(this.handleError)
    );
  }
  putDetails(details: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.put(this.url + 'updateProfile', details, requestOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<Product>(this.url + 'updateProfile' + id).pipe(
      catchError(this.handleError)
    );
  }
  // Headers={'Authorization':'bearer'+localStorage.getItem("token")}

  postotp(valu: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.post(this.url + 'verifyMobile', valu, requestOptions)
  }
  token() {
    return !localStorage.getItem("token");
  }
  postSignIn(value: any): Observable<any> {
    return this.http.post(this.url + 'emailLogin', value).pipe(
      catchError(this.handleError)
    );
  }
  postSignUp(values: any): Observable<any> {
    return this.http.post(this.url + 'insertUser', values).pipe(
      catchError(this.handleError)
    );
  }
  postResend(monumber: any): Observable<any> {
    return this.http.post(this.url + 'resendOTP', monumber).pipe(
      catchError(this.handleError));
  }
  postClockIn(valu: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.post(this.url + 'workerStatus',valu,requestOptions).pipe(
      catchError(this.handleError));
  }
  
  updateEntry(detail: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.put(this.url + 'endworkingStatus', detail, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateEntryDetails(detail: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.put(this.url + 'updateEntryDetails', detail, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateEntryTime(detail: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.put(this.url + 'updateEntryTime', detail, requestOptions).pipe(
      catchError(this.handleError)
    );
  }
  

  updateEntryDate(detail: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.put(this.url + 'updateEntryDate', detail, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateSiteAddress(detail: any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.put(this.url + 'updateSiteAddress', detail, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  removeTask(detail: any): Observable<any>{
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.put(this.url + 'removeTask', detail, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  removeEntry(entryID: any): Observable<any>{
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.delete(this.url+'removeEntry?entry_id='+entryID,requestOptions).pipe(catchError(this.handleError))
  }

  getEntryDetails(entryID: any): Observable<any>{
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.get(this.url+'getEntryDetails?entry_id='+entryID,requestOptions).pipe(catchError(this.handleError))
  }

  getData(): Observable<any>{
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.get(this.url+'getAllsite?code=',requestOptions).pipe(catchError(this.handleError))
  }

  getTradeCategories(){
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.get(this.url+'getTradeCategories',requestOptions).pipe(catchError(this.handleError))
  }
  // putClockIn(valu: any): Observable<any> {
  //   let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
  //   const requestOptions = { headers: header };
  //   return this.http.put(this.url + 'endworkingStatus',valu,requestOptions).pipe(
  //     catchError(this.handleError));
  // }

  getTimeSheet(val:any){
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.get(this.url+'timesheet?start_time='+val.start_time+'&end_time='+val.end_time,requestOptions).pipe(catchError(this.handleError))
  }

  postAddTask(val:any){
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.post(this.url + 'addworkstatus-trade',val,requestOptions).pipe(
      catchError(this.handleError));
  }

  gettoken() {
    return !!localStorage.getItem("token");
  }
  getLatestToken(){
    return !!localStorage.getItem("latestToken")
  }
  gettimesheetTask(val:any){
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.get(this.url+'timesheet-user?start_date='+val,requestOptions).pipe(catchError(this.handleError))
  }
  uploadimage(detail:any){  let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
  const requestOptions = { headers: header };
  return this.http.put(this.url + 'uploadsImage', detail, requestOptions).pipe(
    catchError(this.handleError)
  );}


  googleSignIn(idtoken:any){
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key='+idtoken,
   { postBody:'id_token=${idtoken}&providerId=google.com',
    requestUri:'http://localhost:4200',
    returnIdpCredential:true,
    returnSecureToken:true,
  })
  }
  postSocialLogin(val:any){
    return this.http.post(this.url + 'socialLogin',val).pipe(
      catchError(this.handleError));
  }
 
  putEditSite(Editdetail: any,s_id:any): Observable<any> {
    let header = new HttpHeaders({ "Authorization": "Bearer " + localStorage.getItem("token") });
    const requestOptions = { headers: header };
    return this.http.put(this.url + 'edittimesheet/'+s_id, Editdetail, requestOptions).pipe(
      catchError(this.handleError)
    );
  }
}
export interface Product {
  _id: string;
  prod_name: string;
  prod_desc: string;
  prod_price: number;
  updated_at: Date;
}