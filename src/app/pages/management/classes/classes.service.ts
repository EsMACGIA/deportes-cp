  
import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {ClassesModel} from './classes.model';

@Injectable()
export class ClassesService extends BaseService{

    getClassList():Observable<any>{
        return this.getBase('classes/', this.setHeaders())
        //return this.data
    }

    getClasses(id):Observable<any>{
        return this.getBase('comissions/listClasses/' + id + '/', this.setHeaders())
        //return this.data
    }

    createClass(Class:ClassesModel):Observable<any>{
        return this.postBase(Class,'classes/', this.setHeaders())
    }

    updateClass(Class:ClassesModel):Observable<any>{
        return this.putBase(Class,'classes/', this.setHeaders())
    }

    deleteClass(Class:ClassesModel):Observable<any>{
        return this.deleteBase(Class,'classes/' + Class.id + '/', this.setHeaders())
    }
}
