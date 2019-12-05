import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {TrainersModel} from './trainers.model';

@Injectable()
export class TrainersService extends BaseService{

    getTrainerList():Observable<any>{
        return this.getBase('trainers/',this.setHeaders())
        //return this.data
    }

    createTrainer(Trainer:TrainersModel):Observable<any>{
        return this.postBase(Trainer,'trainers/'),this.setHeaders()
    }

    updateTrainer(Trainer:TrainersModel):Observable<any>{
        return this.putBase(Trainer,'trainers/',this.setHeaders())
    }

    deleteTrainer(Trainer:TrainersModel):Observable<any>{
        return this.deleteBase(Trainer,'trainers/' + Trainer.id + '/',this.setHeaders())
    }
}
