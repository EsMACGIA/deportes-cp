import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxAuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { 
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSpinnerModule
} from '@nebular/theme';

// Components
import { NgxLoginComponent } from './login/login.component';
import { NbRequestPasswordComponent } from './request-password/request-password.component';

// Providers
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NgxAuthRoutingModule,
    NbAuthModule,
    NbSpinnerModule
  ],
  declarations: [
    NgxLoginComponent,
    NbRequestPasswordComponent
  ],
  providers: [
    AuthService
  ]
})
export class NgxAuthModule {

}
