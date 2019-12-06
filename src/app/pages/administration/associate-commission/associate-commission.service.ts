  
import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {AssociateModel} from './associate-commission.model';

@Injectable()
export class AssociateService extends BaseService{

    getAssociateList():Observable<any>{
        return this.getBase('trainers/addComission', this.setHeaders())
        //return this.data
    }

    createAssociation(Class:AssociateModel):Observable<any>{
        return this.postBase(Class,'trainers/addComission/', this.setHeaders())
    }

    deleteAssociation(Class:AssociateModel):Observable<any>{
        return this.postBase(Class,'trainers/deleteComission/', this.setHeaders())
    }
}
