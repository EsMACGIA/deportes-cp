import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {CommissionsModel} from './commissions.model';

@Injectable()
export class CommissionsService extends BaseService{

    // getCommissionsList():Observable<any>{
    //     var lista = this.getBase('commissions/')
    //     return lista
    // }

    private data:CommissionsModel[] = [
        {id: 1,
        name : 'Futbol',
        email : 'com-futbol@cp.com',
        password : '12345678'},
        {id: 2,
          name : 'Natación',
          email : 'com-natacion@cp.com',
          password : '12345678'},
        {id: 3,
            name : 'Karate',
            email : 'com-karate@cp.com',
            password : '12345678'},
  
      ]

    getCommissionList():any{
        return this.data
    }

    createCommission(commission:CommissionsModel):any{
        this.data.push(commission);
        return this.data
    }

    deleteCommission(commission:CommissionsModel):Observable<any>{
        return this.deleteBase(commission,'commissions/' + commission.id + '/')
    }

    updateCommission(commission:CommissionsModel):Observable<any>{
        return this.putBase(commission,'commissions/')
    }
}