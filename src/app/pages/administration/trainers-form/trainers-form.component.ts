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


@Component({
    selector: 'ngx-trainers-form',
    templateUrl: './trainers-form.component.html',
    styleUrls: ['./trainers-form.component.scss'],
  })

export class TrainersFormComponent {
    private trainer : TrainersModel = this.router.getCurrentNavigation().extras.queryParams.trainer;
    private trainer2:TrainersModel = new TrainersModel();
    private match : boolean = true;
    private edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;
    private commissionsList:CommissionsModel[];

    //Settings of Smart Table
    settings = {
    actions: {
      columnTitle: 'Acciones',
      edit: false,
      },
    mode: 'external',
    editor: {
      type: 'checkbox',
    },
    add: {
      addButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-close"></i>',
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

  settings2 = {
    actions: {
      columnTitle: 'Acciones',
      add:false,
      delete: false,
      position:'right',
      },
    mode: 'external',
    edit:{
      editButtonContent: '<i class="nb-plus"></i>',
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

    private commissions = [
      {
        id: 3,
        name: 'Natacion',
        email: 'natacion@cp.com'
      },
      {
        id: 4,
        name: 'Karate',
        email: 'karate@cp.com'
      },
      {
        id: 5,
        name: 'Danza',
        email: 'danza@cp.com'
      },
    ]


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
            this.source.load(this.commissions)
          
    }

    addTrainerForm(trainerForm:NgForm){
        if (trainerForm.valid){ 
            if(trainerForm.value.password == trainerForm.value.confirm_password){
                this.match = true;
            }else{
                this.match = false;
            }
            Object.assign(this.trainer2, this.trainer)
            if (this.match){
                delete this.trainer2.confirmPassword;
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
            Object.assign(this.trainer2, this.trainer)
            if (this.match){
                delete this.trainer2.confirmPassword;
                delete this.trainer2.ci;
                delete this.trainer2.email;
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

    addCommission(event){
      console.log('AAA=[.')
      for (let i = 0;i<this.commissionsList.length;i++){
        if (event.data.id == this.commissionsList[i].id){
          this.commissionsList.splice(i,1)
          this.source2.load(this.commissionsList)
        }
      }
      this.commissions.push(event.data)
      this.source.load(this.commissions)
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
                  console.log('Test')
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
        this.loadAllCommissions();
        Object.assign(this.trainer,event.data) //Instance all fields of user with the event data
        this.dialogRef = this.dialogService.open(
          dialog,
          { context: this.trainer.name });
      }

      closeModal(){
        this.dialogRef.close();
      }
}