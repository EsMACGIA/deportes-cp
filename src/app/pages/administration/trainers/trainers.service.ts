import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {TrainersModel} from './trainers.model';

@Injectable()
export class TrainersService extends BaseService{

    private data:TrainersModel[] = [
        {id: 1,
        name : 'Juan',
        lastname : 'Oropeza',
        email : 'JO@cp.com',
        password : '12345678',
        ci : 12345678,
        confirmPassword : '12345678'},

        {id: 2,
        name : 'Manuel',
        lastname : 'Faria',
        email : 'MF@cp.com',
        password : '12345678',
        ci : 12345678,
        confirmPassword : '12345678'},

        {id: 3,
        name : 'Carlos',
        lastname : 'Rivero',
        email : 'CR@cp.com',
        password : '12345678',
        ci : 12345678,
        confirmPassword : '12345678'},
  
      ]

    getTrainerList():Observable<any>{
        return this.getBase('trainers/')
        //return this.data
    }

    createTrainer(Trainer:TrainersModel):Observable<any>{
        return this.postBase(Trainer,'trainers/')
    }

    updateTrainer(Trainer:TrainersModel):Observable<any>{
        return this.putBase(Trainer,'trainers/')
    }

    deleteTrainer(Trainer:TrainersModel):Observable<any>{
        return this.deleteBase(Trainer,'trainers/' + Trainer.id + '/')
    }
}
