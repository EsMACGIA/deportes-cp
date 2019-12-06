import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {RequestModel} from './request.model';

@Injectable()
export class RequestsService extends BaseService{

    getRequestsList():Observable<any>{
        return this.getBase('requests/', this.setHeaders())
    }

    createRequest(request:RequestModel):Observable<any>{
        return this.postBase(request,'requests/', this.setHeaders())
    }
    deleteRequest(request:RequestModel):Observable<any>{
        return this.deleteBase(request,'requests/' + request.id + '/', this.setHeaders())
    }

    updateRequest(request:RequestModel):Observable<any>{
        return this.putBase(request,'requests/', this.setHeaders())
    }
}