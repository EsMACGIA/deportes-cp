import { Injectable } from '@angular/core';
import {BaseService} from '../../../app.base.service';
import { Observable } from 'rxjs';
import {UserModel} from './user.model';

@Injectable()
export class UsersService extends BaseService{

    verifyBack():Observable<Object>{
        return this.getBase('')
    }
    getUserList():Observable<UserModel[]>{
        return this.getBase('users/')
    }

    createUser(user:UserModel):Observable<UserModel>{
        return this.postBase(user,'users/')
    }

    deleteUser(user:UserModel):Observable<Object>{
        return this.deleteBase(user,'users/')
    }

    updateUser(user:UserModel):Observable<UserModel>{
        return this.putBase(user,'users/')
    }
}
