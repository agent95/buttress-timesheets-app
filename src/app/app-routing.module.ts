import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatonGuard } from './authenticaton.guard';
import { BlankpageComponent } from './blankpage/blankpage.component';
import { ClockInComponent } from './clock-in/clock-in.component';
import { ClockOutComponent } from './clock-out/clock-out.component';
import { ClockTaskComponent } from './clock-task/clock-task.component';
import { ClockComponent } from './clock/clock.component';
import { EntryDetailsComponent } from './entry-details/entry-details.component';
import { IndexComponent } from './index/index.component';
import { OtpComponent } from './otp/otp.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TimesheetTaskComponent } from './timesheet-task/timesheet-task.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path:'',component:IndexComponent},
 { path:'clock',component:ClockComponent,canActivate: [AuthenticatonGuard]},
 {path:'clock-in',component:ClockInComponent,canActivate: [AuthenticatonGuard]},
 {path:'clock-out',component:ClockOutComponent , canActivate: [AuthenticatonGuard]},
 {path:'clock-task',component:ClockTaskComponent, canActivate: [AuthenticatonGuard]},
 {path:'index',component:IndexComponent},
 {path:'otp/:id',component:OtpComponent },
 {path:'profile',component:ProfileComponent,canActivate: [AuthenticatonGuard]},
 {path:'timesheet',component:TimesheetComponent, canActivate: [AuthenticatonGuard]},
 {path:'timesheet-task',component:TimesheetTaskComponent ,canActivate: [AuthenticatonGuard]},
 {path:'entry-details',component:EntryDetailsComponent ,canActivate: [AuthenticatonGuard]},
 {path:'verify/:id',component:VerifyComponent},
 {path:'sign-in/:id',component:SignInComponent},
 {path:'sign-up/:id',component:SignUpComponent},
 {path:'blankpage',component:BlankpageComponent,canActivate: [AuthenticatonGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
