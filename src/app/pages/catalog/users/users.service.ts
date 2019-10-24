import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {UserModel} from './user.model';

@Injectable()
export class UsersService extends BaseService{

    getUserList():Observable<any>{
        return this.getBase('users/')
    }

    createUser(user:UserModel):Observable<any>{
        return this.postBase(user,'users/')
    }

    updateUser(user:UserModel):Observable<any>{
        return this.putBase(user,'users/')
    }

    deleteUser(user:UserModel):Observable<any>{
        return this.deleteBase(user,'users/' + user.id + '/')
    }
}
