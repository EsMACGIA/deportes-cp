/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';

import { AuthService } from '../auth.service'

import {NbToastrService,NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';


@Component({
  selector: 'nb-request-password-page',
  templateUrl: './request-password.component.html'
})
export class NbRequestPasswordComponent extends NbLoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  destroyByClick = false;
  duration = 4000;
  hasIcon = true;
  preventDuplicates = false;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  index = 1;

  constructor(
    service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) options: {},
    cd: ChangeDetectorRef,
    router: Router,
    private authService: AuthService,
    private toastrService: NbToastrService
  ) {
    super(service, options, cd, router);
  }

  requestPassword(email) {
    this.authService.requestPassord(email).subscribe(data => {
      if (data) {
        if (data.error) {
          this.showToast('danger','Hubo un error al cambiar la contraseña', data.error.error);
        } else {
          this.submitted = true;
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