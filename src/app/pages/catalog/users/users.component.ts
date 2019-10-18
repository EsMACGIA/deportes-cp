import { Component, PLATFORM_ID, Inject, Injector} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';;
import {UserModel} from './user.model';
import { NgModel } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Primer nombre',
        type: 'string',
      },
      lastName: {
        title: 'Apellido',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      type: {
        title: 'Tipo',
        type: 'number',
      },
      ci: {
        title: 'Cedula',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  activeModal:any;
  private UserList:any;
  edit:boolean; //Var to differece when edit and create
  user:UserModel = new UserModel();
  private modalService: NgbModal;

  config:ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-full-width',
    timeout: 30000,
    tapToDismiss: true,
    showCloseButton: true,

  })
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private service: SmartTableData,
    private injector: Injector) {

    if (isPlatformBrowser(this.platformId)){
      this.modalService = this.injector.get(NgbModal);
    }
    const data = this.service.getData();
    const data1= [{
      id: 1,
      name: 'Juan',
      lastName : 'Oropeza',
      email : 'joropeza@gmail.com',
      type: 4,
      ci: 'V-2424336'
    },
    {
      id: 2,
      name: 'Manuel',
      lastName : 'Faria',
      email : 'manuelfari@gmail.com',
      type: 4,
      ci: 'V-2324332'
    },
    {
      id: 3,
      name: 'Wilfredo',
      lastName: 'Graterol',
      email: '15-10639@usb.ve',
      type: 2,
      ci: 'V-2233241'
    },
    {
      id: 4,
      name: 'Carlos',
      lastName: 'Rivero',
      email: 'crivero@gmail.com',
      type: 4,
      ci: 'V-2142492'
    },
    {
      id: 1,
      name: 'Jose',
      lastName: 'Basanta',
      email: 'josedavidb6@gmail.com',
      type: 1,
      ci: 'v-21759574'
    }
  ]
    this.source.load(data1);
  }

  //Function to show modal when create in smart table
  addUserModal(content): void{
    this.activeModal =  this.modalService.open(content, { size: 'lg'})
  }

  //Function to show modal when edit in smart table
  editProductModal(content, event): void{
    this.edit = true
    Object.assign(this.user, event.data)
    const modal_options : NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.user = new UserModel();
        this.edit = false
        return true
      }
    }
    this.activeModal = this.modalService.open(content, modal_options)
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

    //The following methods are for interact on DB


     /**
   * Get users from service/DB and show their info on smart-table
   *
   * @memberof UsersComponent
   */
  getUsers() {
    this.source.load(this.UserList);
    }

        /**
   * Method that makes to add a new user to service/DB
   *
   * @memberof UsersComponent
   */
  addUsers() {
    this.UserList.push(this.user);
    this.getUsers();
  }

     /**
   * Method that makes the update for a user info on service/DB
   *
   * @memberof UsersComponent
   */
  editProduct(){

    // var pos = this.UserList.indexOf(this.user);

    // var elementoEliminado = this.UserList.splice(pos, 1); // así es como se elimina un elemento
    this.UserList.push(this.user);
    this.getUsers();

  }

}


