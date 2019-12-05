import { Component,TemplateRef } from '@angular/core';

//Models
import { CommissionsModel } from './commissions.model';
//Services
import {CommissionsService} from './commissions.service';
//Components
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import {Router, NavigationExtras } from'@angular/router';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';


@Component({
    selector: 'ngx-smart-table',
    templateUrl: './commissions.component.html',
    styleUrls: ['./commissions.component.scss'],
  })
export class CommissionsComponent {

    //Settings for Smart Table
  settings = {
    actions: {columnTitle: 'Acciones',},
    mode:'external',
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
      email:{
          title: 'Correo electrónico',
          type: 'string',
      },
    },
  };
  //Toastr configuration
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;
  //Variable to Load info to Smart Table
  source: LocalDataSource = new LocalDataSource();
  private commissionsList:CommissionsModel[];
  private commission:CommissionsModel = new CommissionsModel();
  private dialogRef : any;
  spinner = true;
  //Var to difference if open edit or add
  private edit: boolean = false; 

  constructor(
    private router: Router,
    private commissionsService:CommissionsService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))
    console.log('currentUser: ', currentUser);
    this.loadCommissions();
  }

    loadCommissions(){
      this.commissionsService.getCommissionsList().subscribe(data=>{
        if (data){
          console.log('Estoy recibiendo los usuarios',data)
          this.commissionsList = data
          this.source.load(this.commissionsList)
          console.log(this.commissionsList)
          this.spinner = false
        }
      });
    }


  editCommissionsForm(event){
    this.edit = true;
    Object.assign(this.commission,event.data) //Instance all fields of trainers with the event data
    let navigationExtras: NavigationExtras = {
      queryParams: { commission : this.commission, edit : this.edit  }
    };
    this.commission.password = ""
    this.commission.confirmPassword = ""
    this.router.navigate(['pages/administration/commissions/form'], navigationExtras);
  }

  /*Function to open modal to confirmation for delete user*/
  openModal(dialog: TemplateRef<any>,event) {
    Object.assign(this.commission,event.data) //Instance all fields of user with the event data
    this.dialogRef = this.dialogService.open(
      dialog,
      { context: this.commission.name });
  }

  confirmDelete(dialog:TemplateRef<any>){
    this.commissionsService.deleteCommission(this.commission).subscribe(data=>{
      if (data){
        if (!data.error){
          
          console.log(data)
          this.showToast('success','Se ha eliminado una disciplina exitosamente','Se ha eliminado la disciplina ' + this.commission.name + ' de manera exitosa.')
          this.dialogRef.close();
          this.loadCommissions();
        }else{
          this.showToast('danger','Hubo un error al eliminar la comisión',data.error.error)
          this.dialogRef.close();
        }
      }
    })
  }

  private showToast(type: NbComponentStatus, title: string, body: string){
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