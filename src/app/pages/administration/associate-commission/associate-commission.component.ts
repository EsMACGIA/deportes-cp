import { Component,TemplateRef } from '@angular/core';

//Models
import { TrainersModel } from '../trainers/trainers.model';
import {AssociateModel} from './associate-commission.model'
//Services
import {TrainersService} from '../trainers/trainers.service';
import {AssociateService} from './associate-commission.service'
//Components
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import {Router, NavigationExtras } from'@angular/router';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';


@Component({
    selector: 'ngx-smart-table',
    templateUrl: './associate-commission.component.html',
    styleUrls: ['./associate-commission.component.scss'],
  })
export class AssociateCommissionComponent {

    //Settings for Smart Table
  settings = {
    actions: {columnTitle: 'Acciones', edit: false},
    mode:'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
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
      lastname:{
          title: 'Apellido',
          type: 'string',
      },
      ci:{
          title: 'CI',
          type: 'string',
      },
    },
  };

  settings2 = {
    selectMode: 'multi',
    pager: {
      display: true,
      perPage: 5
    },
    actions: {
      columnTitle: '',
      add:false,
      delete: false,
      edit: false,
      select: true,
      position:'left',
      },
    mode: 'external',
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
      lastname: {
        title: 'Apellido',
        type: 'string',
      },
      ci: {
        title: 'CI',
        type: 'string'
      }
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
  source2: LocalDataSource = new LocalDataSource();
  private trainersList:TrainersModel[];
  private tempTrainersList:TrainersModel[];
  private trainers:TrainersModel[];
  private trainer:TrainersModel = new TrainersModel();
  private dialogRef : any;
  spinner = true;
  commissionId : number;
  //Var to difference if open edit or add
  private edit: boolean = false; 
  currentUser;
  association : AssociateModel = new AssociateModel();
  addTrainerError : boolean = false;

  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private TrainersService: TrainersService,
    private AssociateService: AssociateService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      try{
        if (this.currentUser.role == 'admin'){
          this.commissionId = this.router.getCurrentNavigation().extras.queryParams.cid
        }
        else{
          this.commissionId = this.currentUser.id
        }
        this.loadTrainers();
    }
    catch{
      this.router.navigate(['pages/administration/associate/']);
    }
  }

  loadTrainers(){
    this.TrainersService.getTrainersInCommission(this.commissionId).subscribe(data=>{
      if (data){
        this.trainers = data
        this.source.load(this.trainers)
        this.spinner = false
      }
    });
  }

  addTrainer(associate:AssociateModel){
    this.AssociateService.createAssociation(associate).subscribe(data=>{
      if (data && !data.error){
        console.log("yay")
      }
      else {
        console.log(data.error)
        this.showToast('danger','Hubo un error al crear entrenador',data.error.error)
        this.addTrainerError = true
    }
    })
  }

  confirmDelete(dialog1:TemplateRef<any>){
    this.association.comission_id = this.commissionId;
    this.association.trainer_id = this.trainer.id;
    //console.log(this.association)
    this.AssociateService.deleteAssociation(this.association).subscribe(data=>{
      if (data){
        if (!data.error){
          
          console.log(data)
          this.showToast('success','Se ha desasociado un entrenador exitosamente','Se ha desasociado el entrenador ' + this.trainer.name + ' de manera exitosa.')
          this.dialogRef.close();
          this.loadTrainers();
        }else{
          this.showToast('danger','Hubo un error al desasociar al entrenador',data.error.error)
          console.log(data.error)
          this.dialogRef.close();
        }
      }
    })
  }

  loadAllTrainers(){
    this.TrainersService.getTrainerList().subscribe( data =>{
      if (data){
        if (!data.error){
          this.trainersList = data;
          for (let i = 0;i<this.trainers.length;i++){
            for (let j = 0;j<this.trainersList.length;j++){
              if(this.trainers[i].id == this.trainersList[j].id){
                this.trainersList.splice(j,1)
              }
            }
          }
          this.source2.load(this.trainersList);
        }else{
          this.showToast('danger','Hubo un error al cargar los entrenadores',data.error.error)
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

  openModal(dialog: TemplateRef<any>,event) {
    this.tempTrainersList = [];
    this.loadAllTrainers();
    Object.assign(this.trainer,event.data) //Instance all fields of user with the event data
    this.dialogRef = this.dialogService.open(
      dialog,
      { context: this.trainer.name });
  }

  onUserRowSelect(event){
    if (event.isSelected == null){
      this.tempTrainersList = event.select
    }else{
      let commission = event.data
      if (event.isSelected){
        this.tempTrainersList.push(event.data)
      }else{
        for (let i = 0;i<this.tempTrainersList.length;i++){
          if (commission == this.tempTrainersList[i].id){
            this.tempTrainersList.splice(i,1)
          }
        }
      }
    }
  }

  saveData(){
    this.addTrainerError = false
    this.association.comission_id = this.commissionId;
    for (let i =0;i<this.tempTrainersList.length;i++){
      this.association.trainer_id = this.tempTrainersList[i].id;
      this.addTrainer(this.association)
      if (this.addTrainerError){
        break
      }
    }
    if (!this.addTrainerError){
      this.showToast('success','Se han asociado los entrenadores exitosamente','Se han asociado los entrenadores de manera exitosa.')
    }
    this.loadTrainers()
    this.association = new AssociateModel()
    this.dialogRef.close();
  }
}