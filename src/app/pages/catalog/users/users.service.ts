import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {UserModel} from './user.model';

@Injectable()
export class UsersService extends BaseService{

    getUserList():Observable<any>{
        return this.getBase('comissions/')
    }

    createUser(user:UserModel):Observable<any>{
        return this.postBase(user,'comissions/')
    }

    updateUser(user:UserModel):Observable<any>{
        return this.putBase(user,'comissions/')
    }

    deleteUser(user:UserModel):Observable<any>{
        return this.deleteBase(user,'comissions/' + user.id + '/')
    }
}
