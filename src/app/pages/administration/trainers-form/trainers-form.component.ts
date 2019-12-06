import { Component, TemplateRef} from '@angular/core';
import {NgForm} from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrContainerComponent} from '@nebular/theme';
//Services
import {TrainersService} from '../trainers/trainers.service';
import {CommissionsService} from '../commissions/commissions.service';
//Models
import {TrainersModel} from '../trainers/trainers.model';
import {Router} from '@angular/router'
import { NbDialogService } from '@nebular/theme';
import {CommissionsModel} from '../commissions/commissions.model';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'ngx-trainers-form',
    templateUrl: './trainers-form.component.html',
    styleUrls: ['./trainers-form.component.scss'],
  })

export class TrainersFormComponent {
    private trainer : TrainersModel = this.router.getCurrentNavigation().extras.queryParams.trainer;
    private trainer2:any;
    private match : boolean = true;
    private edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;
    private commissionsList:CommissionsModel[] = [];
    private tempComisssionList:CommissionsModel[];
    private commissionsListToSend:number[];
    private commissions:CommissionsModel[];

    //Settings of Smart Table
    settings = {
    actions: {
      columnTitle: 'Acciones',
      edit: false,
      },
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-close"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID de la comisión',
        type: 'number',
      },
      name: {
        title: 'Nombre de la comisión',
        type: 'string',
      },
      email: {
        title: 'E-mail de la comisión',
        type: 'string',
      },
    },
    noDataMessage	: "Ninguna comisión asociada todavía",
  };

  settings2 = {
    selectMode: 'multi',
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
        title: 'ID de la comisión',
        type: 'number',
      },
      name: {
        title: 'Nombre de la comisión',
        type: 'string',
      },
      email: {
        title: 'E-mail de la comisión',
        type: 'string',
      },
    },
  };
    //Variables to Toastr configuration
    config:ToasterConfig;
    position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    status: NbComponentStatus = 'success'
    duration = 4000;
    destroyByClick = false;
    hasIcon = true;
    index = 1; 
    preventDuplicates = false;
    private currentUser:any;
    private type_user:string;
    private dialogRef : any;
    //Variable to load info to smart table
    source: LocalDataSource = new LocalDataSource();
    //Variable to load info of all commissions
    source2 : LocalDataSource = new LocalDataSource();


  constructor(
        private trainersService:TrainersService, 
        private trainersModel:TrainersModel,
        private router:Router,
        private toastrService: NbToastrService,
        private dialogService: NbDialogService,
        private commissionsService:CommissionsService) {
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
          console.log(this.currentUser)
          this.type_user = this.currentUser.role
          console.log(this.currentUser.role)
          this.commissions = [];
          if (this.type_user == 'admin' && this.edit){
            console.log(this.trainer)
            trainersService.getCommissionsForTrainer(this.trainer).subscribe(data=>{
              if (data){
                if (!data.error){
                  console.log(data);
                  for (let i = 0; i < data.length; i ++){
                    let commision:CommissionsModel = new CommissionsModel;
                    commision.id = data[i].commission_id
                    commision.name = data[i].comission_name
                    commision.email = data[i].comission_email
                    this.commissions.push(commision)
                  }
                  this.source.load(this.commissions)
                }else{
                  this.showToast('danger','Hubo un error al cargar las comisiones asociadas al entrenador',data.error.error)
                }
                
              }
            })
          }
          
    }

    addTrainerForm(trainerForm:NgForm){
        if (trainerForm.valid){ 
            if(trainerForm.value.password == trainerForm.value.confirm_password){
                this.match = true;
            }else{
                this.match = false;
            }
            this.trainer2 = {}
            Object.assign(this.trainer2, this.trainer)
            if (this.match){
                delete this.trainer2.confirmPassword;
                this.commissionsListToSend = []
                if (this.type_user == 'admin'){
                  for (let i = 0;i<this.commissions.length;i++){
                    this.commissionsListToSend[i] = this.commissions[i].id
                  }
                }
                this.trainer2.comissions = this.commissionsListToSend;
                this.trainersService.createTrainer(this.trainer2).subscribe(data=>{
                    if (data && !data.error){
                        console.log("Yay")
                        this.showToast('success','Se ha creado un entrenador exitosamente','Se ha creado el entrenador ' + this.trainer2.name + ' de manera exitosa.')
                        this.router.navigate(['/pages/administration/trainers']);
                    }
                    else {
                        console.log(data.error)
                        this.showToast('danger','Hubo un error al crear entrenador',data.error.error)
                        this.router.navigate(['/pages/administration/trainers']);
                    }
                });
            }
        }
    }
    editTrainerForm(trainerForm:NgForm){
        if (trainerForm.valid){ 
            if(trainerForm.value.password == trainerForm.value.confirm_password){
                this.match = true;
            }else{
                this.match = false;
            }
            this.trainer2 = {}
            Object.assign(this.trainer2, this.trainer)
            if (this.match){
                delete this.trainer2.confirmPassword;
                delete this.trainer2.ci;
                delete this.trainer2.email;
                this.commissionsListToSend = []
                if (this.type_user == 'admin'){
                  for (let i = 0;i<this.commissions.length;i++){
                    this.commissionsListToSend[i] = this.commissions[i].id
                  }
                }
                this.trainer2.comissions = this.commissionsListToSend;
                //console.log(this.trainer2)
                this.trainersService.updateTrainer(this.trainer2).subscribe(data=>{
                    if (data && !data.error){
                        console.log("Yay")
                        this.showToast('success','Se ha modificado un entrenador exitosamente','Se ha modificado el entrenador ' + this.trainer2.name + ' de manera exitosa.')
                        this.router.navigate(['/pages/administration/trainers']);
                    }
                    else {
                        console.log(data.error)
                        this.showToast('danger','Hubo un error al modificar entrenador',data.error.error)
                        this.router.navigate(['/pages/administration/trainers']);
                    }
                });
            }
        }
    }


    disassociateTrainer(event){
      for (let i = 0;i<this.commissions.length;i++){
        if (event.data.id == this.commissions[i].id){
          this.commissions.splice(i,1)
        }
      }
      this.source.load(this.commissions)
    }

    loadAllCommissions(){
      this.commissionsService.getCommissionsList().subscribe( data =>{
        if (data){
          if (!data.error){
            this.commissionsList = data;
            for (let i = 0;i<this.commissions.length;i++){
              for (let j = 0;j<this.commissionsList.length;j++){
                if(this.commissions[i].id == this.commissionsList[j].id){
                  this.commissionsList.splice(j,1)
                }
              }
            }
            this.source2.load(this.commissionsList);
          }else{
            this.showToast('danger','Hubo un error al cargar las comisiones',data.error.error)
          }
        }
      }
      )
    }

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

      openModal(dialog: TemplateRef<any>,event) {
        this.tempComisssionList = [];
        this.loadAllCommissions();
        Object.assign(this.trainer,event.data) //Instance all fields of user with the event data
        this.dialogRef = this.dialogService.open(
          dialog,
          { context: this.trainer.name });
      }

      onUserRowSelect(event){
        if (event.isSelected == null){
          this.tempComisssionList = event.select
        }else{
          let commission = event.data
          if (event.isSelected){
            this.tempComisssionList.push(event.data)
          }else{
            for (let i = 0;i<this.tempComisssionList.length;i++){
              if (commission == this.tempComisssionList[i].id){
                this.tempComisssionList.splice(i,1)
              }
          }
          }
        }
      }

      saveData(){
        for (let i =0;i<this.tempComisssionList.length;i++){
          this.commissions.push(this.commissionsList[i])
        }
        this.source.load(this.commissions)
        this.dialogRef.close();
      }
}