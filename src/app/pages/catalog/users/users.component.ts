import { Component, PLATFORM_ID, Inject, Injector} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';
import {UsersService} from '../users/users.service';
import {UserModel} from '../users/user.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
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
      ci: {
        title: 'Cedula',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  private UserList:UserModel[];
  private user:UserModel = new UserModel();
  config:ToasterConfig;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;
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

  /*Function to open modal with form for create user */
  addUser(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  /*Function to process create User Form */
  addUserForm(userForm:NgForm){
    this.usersService.createUser(this.user).subscribe(data=>{
      console.log(userForm.value)
      if(data){
        if(!data.error){
          this.modalService.dismissAll();
          this.loadUsers();
          this.showToast('success','Se ha creado un usuario exitosamente','Se ha creado el usuario ' + this.user.name + ' de manera exitosa.')
          console.log(data);
        }else{
          console.log(data.error)
          this.modalService.dismissAll();
          this.showToast('danger','Hubo un error al crear usuario',data.error.error)
        }


      }
    })
  }

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


