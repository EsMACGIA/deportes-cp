import { Injectable } from '@angular/core';
import {BaseService} from '../app.base.service';
import { Observable } from 'rxjs';

import { LoginModel } from './models/login.model';
import { RequestPasswordModel } from './models/request-password.model'

@Injectable()
export class AuthService extends BaseService{

    login(login: LoginModel):Observable<any> {
      return this.postBase(login, 'auth/')
    }

    requestPassord(request: RequestPasswordModel) {
      return this.putBase(request, 'auth/')
    }
}