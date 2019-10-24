import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {TrainersModel} from './trainers.model';

@Injectable()
export class TrainersService extends BaseService{

    getTrainerList():Observable<any>{
        return this.getBase('users/')
    }

    createTrainer(Trainer:TrainersModel):Observable<any>{
        return this.postBase(Trainer,'users/')
    }

    updateTrainer(Trainer:TrainersModel):Observable<any>{
        return this.putBase(Trainer,'users/')
    }

    deleteTrainer(Trainer:TrainersModel):Observable<any>{
        return this.deleteBase(Trainer,'users/' + Trainer.id + '/')
    }
}
