import { Injectable } from '@angular/core';
import {BaseService} from '../app.base.service';
import { Observable } from 'rxjs';

import { LoginModel } from './models/login.model'

@Injectable()
export class AuthService extends BaseService{

    login(login: LoginModel):Observable<any> {
      return this.postBase(login, 'auth/')
    }

    // getDisciplineList():Observable<any>{
    //     console.log("antes de get")
    //     var lista = this.getBase('disciplines/')
    //     console.log("despues de get")
    //     return lista
    // }

    // createDiscipline(discipline:DisciplinesModel):Observable<any>{
    //     return this.postBase(discipline,'disciplines/')
    // }

    // deleteDiscipline(discipline:DisciplinesModel):Observable<any>{
    //     return this.deleteBase(discipline,'disciplines/' + discipline.id + '/')
    // }

    // updateDiscipline(discipline:DisciplinesModel):Observable<any>{
    //     return this.putBase(discipline,'disciplines/')
    // }
}