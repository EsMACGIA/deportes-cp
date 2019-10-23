import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {DisciplinesModel} from './disciplines.model';

@Injectable()
export class DisciplinesService extends BaseService{

    getDisciplineList():Observable<any>{
        return this.getBase('disciplines/')
    }

    createDiscipline(discipline:DisciplinesModel):Observable<any>{
        return this.postBase(discipline,'disciplines/')
    }

    deleteDiscipline(discipline:DisciplinesModel):Observable<any>{
        return this.deleteBase(discipline,'disciplines/')
    }

    updateDiscipline(discipline:DisciplinesModel):Observable<any>{
        return this.putBase(discipline,'disciplines/')
    }
}