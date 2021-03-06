import { Component, ElementRef,ViewChild} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';
import {UsersService} from '../users/users.service';
import {UserModel} from '../users/user.model';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';
import { User } from '../../../@core/data/users';
import { NbDialogService } from '@nebular/theme';
import {NbThemeService } from '@nebular/theme';





@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {

  closeResult: string;

  //Settings of Smart Table
  settings = {
    actions: {columnTitle: 'Acciones',},
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
        title: 'Nombre',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
    },
  };

  //Variable to load info to smart table
  source: LocalDataSource = new LocalDataSource();

  //Objects for Model User
  private UserList:UserModel[];
  private user:UserModel = new UserModel();
  private user2:UserModel = new UserModel();

  //Variables to Toastr configuration
  config:ToasterConfig;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;
  current_theme:string;
  background = "white";
  fonts = "black";
  public styles:any;
  @ViewChild('createUserModal',{static:false}) myDiv: ElementRef;
  
  //Var to difference if open edit modal or add modal
  edit: boolean = false; 
  private  doesntMatch:boolean = false;

  constructor(
    private service: SmartTableData,
    private http: HttpClient,
    private usersService: UsersService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private themeService: NbThemeService) {

      this.themeService.onThemeChange()
          .subscribe((theme: any) => {
            var modal = document.getElementById('modal');

            this.current_theme = theme.name
            if(this.current_theme == 'default'){
              this.background = 'white';
              this.fonts = 'black'
              // modal.style.background = 'white';
              // modal.style.color = 'black'
            }
            else if (this.current_theme == 'dark'){
              console.log('Hola')
              this.background = '#091c7a';
              console.log(this.background)
              this.fonts = 'white'
            } else if (this.current_theme == 'cosmic'){
              this.background = '#29157a'
              this.fonts = 'white'
              // modal.style.background = '#29157a'
              // modal.style.color = 'white'
            } else if (this.current_theme == 'corporate'){
              this.background = 'white'
              this.fonts = 'black'
              // modal.style.background = 'white'
              // modal.style.color = 'black'
            }

            let styles= {
              backgroundColor : this.background,
              color: this.fonts
            }
          });
      this.loadUsers();
  }

  /*Load the User to table */

  loadUsers(){
    this.usersService.getUserList().subscribe(data=>{
      if (data){
        console.log('Estoy recibiendo los usuarios',data)
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
      Object.assign(this.user2, this.user)
      if (userForm.value.password != userForm.value.confirmPassword){
        this.doesntMatch = true
      }else{
        this.doesntMatch = false
      }
      delete this.user2.confirmPassword;
      if (!this.doesntMatch){
        console.log("Estoy creando este usuario",this.user2)
        this.usersService.createUser(this.user2).subscribe(data=>{
          if(data){
            this.modalService.dismissAll();
            if(!data.error){
              this.loadUsers();
              this.showToast('success','Se ha creado una comisión exitosamente','Se ha creado la comisión ' + this.user2.name + ' de manera exitosa.')
              console.log(data);
            }else{
              console.log(data.error)
              this.showToast('danger','Hubo un error al crear comisión',data.error.error)
            }
    
            this.user = new UserModel();
          }
        })
      }
    }
  }

  editUserForm(userForm:NgForm){
    if (userForm.valid){
      console.log(userForm)
      console.log('Este es es el valor de password', userForm.value.password)
      if (userForm.value.password != userForm.value.confirmPassword){
        this.doesntMatch = true
      }else{
        this.doesntMatch = false
      }
      console.log("Este es el usuario que estoy editando",this.user)
      Object.assign(this.user2, this.user)
      delete this.user2.id;
      delete this.user2.confirmPassword;
      if (!this.user2.password){
        this.user2.password = ''
      }
      console.log("Este es el user original" ,this.user)
      console.log('Este es la comision que estoy editando', this.user2)

      if (!this.doesntMatch){
        this.usersService.updateUser(this.user2).subscribe(data=>{
          if(data){
            this.modalService.dismissAll();
            if(!data.error){
              this.loadUsers();
              console.log(this.user);
              this.showToast('success','Se ha actualizado la comisión exitosamente', 'Se ha actualizado la comisión ' + this.user2.name + ' de manera exitosa.')
              console.log(data);
            }else{
              console.log(data.error)
              this.showToast('danger', 'Hubo un error al actualizar la comisión', data.error.error)
            }
            this.user = new UserModel();
          }
        })
      }
    }
  }

  deleteUserConfirm(){
    this.usersService.deleteUser(this.user).subscribe(data=>{
      console.log(this.user,"Este es el usuario que estoy eliminando")
      if(data){
        this.modalService.dismissAll();
        if (!data.error){
          this.loadUsers();
          this.showToast('success', 'Se ha eliminado la comisión exitosamente', 'Se ha eliminado la comisión ' + this.user.name + ' de manera exitosa.')
        }else{
          this.showToast('danger','Hubo un error al eliminar la comisión', data.error.error)
        }
        this.user = new UserModel();

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


