import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {CommissionsModel} from './commissions.model';

@Injectable()
export class CommissionsService extends BaseService{

    getCommissionsList():Observable<any>{
        this.setHeaders();
        return this.getBase('comissions/', this.setHeaders())
    }

    createCommissions(commissions:CommissionsModel):Observable<any>{
        return this.postBase(commissions,'comissions/', this.setHeaders())
    }
    deleteCommission(commission:CommissionsModel):Observable<any>{
        return this.deleteBase(commission,'comissions/' + commission.id, this.setHeaders())
    }

    updateCommission(commission:CommissionsModel):Observable<any>{
        return this.putBase(commission,'comissions/', this.setHeaders())
    }
}