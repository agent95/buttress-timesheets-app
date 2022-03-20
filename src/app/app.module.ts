import { NgModule } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { ClockInComponent } from './clock-in/clock-in.component';
import { ClockOutComponent } from './clock-out/clock-out.component';
import { ClockTaskComponent } from './clock-task/clock-task.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { ProfileComponent } from './profile/profile.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetTaskComponent } from './timesheet-task/timesheet-task.component';
import { VerifyComponent } from './verify/verify.component';
import { AuthguardServiceService } from './authguard-service.service';
import { AuthenticatonGuard } from './authenticaton.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import{ BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgOtpInputModule } from  'ng-otp-input';
import { AgmCoreModule } from '@agm/core';
import { DatePipe } from '@angular/common';
import { BlankpageComponent } from './blankpage/blankpage.component';
import { CookieService } from 'ngx-cookie-service';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { EntryDetailsComponent } from './entry-details/entry-details.component';
import { IconEditComponent } from './icon-edit/icon-edit.component';
import { IconPlusComponent } from './icon-plus/icon-plus.component';
import { IconXComponent } from './icon-x/icon-x.component';
import { IconMinusComponent } from './icon-minus/icon-minus.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    ClockInComponent,
    ClockOutComponent,
    ClockTaskComponent,
    IndexComponent,
    LoginComponent,
    OtpComponent,
    ProfileComponent,
    TimesheetComponent,
    TimesheetTaskComponent,
    VerifyComponent,
    SignInComponent,
    SignUpComponent,
    BlankpageComponent,
    EntryDetailsComponent,
    IconEditComponent,
    IconPlusComponent,
    IconXComponent,
    IconMinusComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ZXingScannerModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    AgmCoreModule.forRoot({
      apiKey: '',  // please add google map api key
      libraries: ['places']

    }),
    SocialLoginModule,
    GooglePlaceModule,
    Ng2TelInputModule,
  ],
  providers: [AuthguardServiceService,AuthenticatonGuard,DatePipe,CookieService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('') // please add google login key

          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('')  //please add facebook login id 
          }
        ]
      } as SocialAuthServiceConfig,
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
