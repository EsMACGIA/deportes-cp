import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {AthletesModel} from './athletes.model';

@Injectable()
export class AthletesService extends BaseService{

    getAthletesList():Observable<any>{
        return this.getBase('athletes/', this.setHeaders())
    }

    createAthletes(athletes:AthletesModel):Observable<any>{
        return this.postBase(athletes,'athletes/')
    }
    deleteAthlete(athlete:AthletesModel):Observable<any>{
        return this.deleteBase(athlete,'athletes/' + athlete.id + '/')
    }

    updateAthlete(athlete:AthletesModel):Observable<any>{
        return this.putBase(athlete,'athletes/')
    }
}