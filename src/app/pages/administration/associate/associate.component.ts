import { Component,TemplateRef } from '@angular/core';

//Models
import { CommissionsModel } from '../commissions/commissions.model';
import { TrainersModel } from '../trainers/trainers.model';
//Services
import {CommissionsService} from '../commissions/commissions.service';
import {TrainersService} from '../trainers/trainers.service';
//Components
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import {Router, NavigationExtras } from'@angular/router';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';


@Component({
    selector: 'ngx-smart-table',
    templateUrl: './associate.component.html',
    styleUrls: ['./associate.component.scss'],
  })
export class AssociateComponent {

    //Settings for Smart Table
  settings = {
    actions: {columnTitle: 'Acciones', delete: false, add: false},
    mode:'external',
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '100px'
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
  currentUser;

  constructor(
    private router: Router,
    private commissionsService:CommissionsService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
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

  associateCommission(event){
    this.edit = true;
    Object.assign(this.commission,event.data) //Instance all fields of trainers with the event data
    let navigationExtras: NavigationExtras = {
      queryParams: { cid : this.commission.id }
    };
    this.router.navigate(['pages/administration/associate/commission'], navigationExtras);
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