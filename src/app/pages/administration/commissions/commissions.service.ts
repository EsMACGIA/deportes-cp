import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {CommissionsModel} from './commissions.model';

@Injectable()
export class CommissionsService extends BaseService{

    getCommissionsList():Observable<any>{
        var lista = this.getBase('commissions/')
        return lista
    }

    createCommission(commission:CommissionsModel):Observable<any>{
        return this.postBase(commission,'commissions/')
    }

    deleteCommission(commission:CommissionsModel):Observable<any>{
        return this.deleteBase(commission,'commissions/' + commission.id + '/')
    }

    updateCommission(commission:CommissionsModel):Observable<any>{
        return this.putBase(commission,'commissions/')
    }
}