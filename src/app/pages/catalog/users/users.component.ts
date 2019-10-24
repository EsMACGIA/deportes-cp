import { Component, PLATFORM_ID, Inject, Injector} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';
import {UsersService} from '../users/users.service';
import {UserModel} from '../users/user.model';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';



@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  closeResult: string;

  //Settings of Smart Table
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      lastname: {
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
      CI: {
        title: 'Cedula',
        type: 'number'
      }
    },
  };

  //Variable to load info to smart table
  source: LocalDataSource = new LocalDataSource();

  //Objects for Model User
  private UserList:UserModel[];
  private user:UserModel = new UserModel();

  //Variables to Toastr configuration
  config:ToasterConfig;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  //Var to difference if open edit modal or add modal
  edit: boolean = false; 

  constructor(
    private service: SmartTableData,
    private http: HttpClient,
    private usersService: UsersService,
    private modalService: NgbModal,
    private toastrService: NbToastrService) {

      this.loadUsers();
  }

  /*Load the User to table */

  loadUsers(){
    this.usersService.getUserList().subscribe(data=>{
      if (data){
        this.UserList = data
        this.source.load(this.UserList)
      }
    })

  }

  
  /*----FUNCTIONS TO HANDLE MODALS----*/

  /*Function to open modal with form for create user */
  addUser(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /*Function to open modal with form for edit user */
  editUser(content,event):void{
    this.edit = true
    console.log(event.data)
    Object.assign(this.user,event.data) //Instance all fields of user with the event data
    const modal_options:NgbModalOptions = {
      size: 'lg',
      beforeDismiss: () => {
        this.user = new UserModel();
        this.edit = false
        return true
      },
      ariaLabelledBy: 'modal-basic-title'

    } 
    this.modalService.open(content, modal_options).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /*Function to open modal to confirmation for delete user*/
  deleteUser(content,event){
    Object.assign(this.user,event.data) //Instance all fields of user with the event data
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.user = event.data;
  }
  

  
  /*Function to close modal */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /*------------------------*/


  /* ----Functions to Handle Forms Submit---- */

  /*Function to process create User Form */
  addUserForm(userForm:NgForm){
    if (userForm.valid){
      this.user.type = Number(userForm.value.type)
      this.usersService.createUser(this.user).subscribe(data=>{
      console.log(this.user)
      console.log(this.user.type)
        if(data){
          this.modalService.dismissAll();
          if(!data.error){
            this.loadUsers();
            this.showToast('success','Se ha creado un usuario exitosamente','Se ha creado el usuario ' + this.user.name + ' de manera exitosa.')
            console.log(data);
          }else{
            console.log(data.error)
            this.showToast('danger','Hubo un error al crear usuario',data.error.error)
          }
  
  
        }
      })
    }
  }

  editUserForm(userForm:NgForm){
    if (userForm.valid){
      console.log(userForm)
      this.usersService.updateUser(this.user).subscribe(data=>{
        if(data){
          this.modalService.dismissAll();
          if(!data.error){
            this.loadUsers();
            this.showToast('success','Se ha actualizado el usuario exitosamente', 'Se ha actualizado el usuario ' + this.user.name + ' de manera exitosa.')
            console.log(data);
          }else{
            console.log(data.error)
            this.showToast('danger', 'Hubo un error al actualizar el usuario', data.error.error)
          }
        }
      })
    }
  }

  deleteUserConfirm(){
    this.usersService.deleteUser(this.user).subscribe(data=>{
      if(data){
        this.modalService.dismissAll();
        if (!data.error){
          this.loadUsers();
          this.showToast('success', 'Se ha eliminado el usuario exitosamente', 'Se ha eliminado el usuario ' + this.user.name + ' de manera exitosa.')
        }else{
          this.showToast('danger','Hubo un error al eliminar el usuario', data.error.error)
        }
      }

    })
  }

  /*------------------------*/

  /* Function to show toast*/
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.index += 1;
    this.toastrService.show(
      body,
      title,
      config);
  }
    


}


