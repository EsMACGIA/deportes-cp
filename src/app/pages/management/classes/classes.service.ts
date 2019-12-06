  
import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {ClassesModel} from './classes.model';

@Injectable()
export class ClassesService extends BaseService{

    getClassList():Observable<any>{
        return this.getBase('classes/', this.setHeaders())
    }

    getClasses(id):Observable<any>{
        return this.getBase('comissions/listClasses/' + id + '/', this.setHeaders())
    }

    getClasses(id):Observable<any>{
        return this.getBase('comissions/listClasses/' + id + '/', this.setHeaders())
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

    getTrainerClasses(id) {
        return this.getBase('trainers/listClasses/' + id, this.setHeaders())
    }

    getAthletesInClass(id) {
        return this.getBase('classes/athletes/' + id, this.setHeaders())
    }
}
