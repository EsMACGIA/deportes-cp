import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {CommissionsModel} from './commissions.model';

@Injectable()
export class CommissionsService extends BaseService{

    getCommissionsList():Observable<any>{
        return this.getBase('comissions/')
    }

    createCommissions(commissions:CommissionsModel):Observable<any>{
        return this.postBase(commissions,'comissions/')
    }
    deleteCommission(commission:CommissionsModel):Observable<any>{
        return this.deleteBase(commission,'comissions/' + commission.id + '/')
    }

    updateCommission(commission:CommissionsModel):Observable<any>{
        return this.putBase(commission,'comissions/')
    }
}