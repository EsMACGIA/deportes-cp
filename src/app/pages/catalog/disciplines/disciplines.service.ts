import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {DisciplinesModel} from './disciplines.model';

@Injectable()
export class DisciplinesService extends BaseService{

    getDisciplineList():Observable<any>{
        console.log("antes de get")
        var lista = this.getBase('disciplines/')
        console.log("despues de get")
        return lista
    }

    createDiscipline(discipline:DisciplinesModel):Observable<any>{
        return this.postBase(discipline,'disciplines/')
    }

    deleteDiscipline(discipline:DisciplinesModel):Observable<any>{
        return this.deleteBase(discipline,'disciplines/' + discipline.id + '/')
    }

    updateDiscipline(discipline:DisciplinesModel):Observable<any>{
        return this.putBase(discipline,'disciplines/')
    }
}