import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';

import { AuthService } from '../auth.service'
import { Router } from '@angular/router';

import {NbToastrService,NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class NgxLoginComponent extends NbLoginComponent {

  destroyByClick = false;
  duration = 4000;
  hasIcon = true;
  preventDuplicates = false;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;

  loginGroup = false;

  constructor(
    private authService: AuthService,
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    router: Router,
    private toastrService: NbToastrService
  ) {
    super(service, options, cd, router);
  }

  auth(user) {
    this.loginGroup = true;
    this.authService.login(user).subscribe(data => {
      if (data){
        if (data.token && data.user) {
          localStorage.setItem('currentToken', data.token);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          this.authService.currentUserSubject.next(data.user);
          this.router.navigate(['/pages/dashboard']);
        } else if (data.error) {
          this.showToast('danger','Hubo un error al iniciar sesión', data.error.error);
          this.loginGroup = false;
        }
      }
    })
  }

  private showToast(type: NbComponentStatus, title: string, body: string){
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.index += 1;
    this.toastrService.show(
      body,
      title,
      config);
  }

}
