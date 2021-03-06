import { Component, TemplateRef} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {NbToastrService,NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';

import {TrainersService} from '../trainers/trainers.service';
import { NbDialogService } from '@nebular/theme';
import { Router, NavigationExtras } from '@angular/router';
import { TrainersModel } from '../trainers/trainers.model';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss'],
})
export class TrainersComponent {

  trainerList = [];
  private currentUser:any;
  private type_user:string;
  private settings;

  //Toastr configuration
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;
  
  //Variable to load info to smart table
  source: LocalDataSource = new LocalDataSource();
  spinner = true;

  //Var to difference if open edit or add
  private edit: boolean = false; 
  private trainer : TrainersModel = new TrainersModel();
  private dialogRef : any;

  constructor(
    private trainersService: TrainersService,
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      console.log(this.currentUser)
      this.type_user = this.currentUser.role
      this.getTrainers();
      if (this.type_user == 'admin'){
        //Settings of Smart Table
        this.settings = {
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
            width: '100px',
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
          ci: {
            title: 'Cedula',
            type: 'number'
          },
        },
        };

      }else{
        //Settings of Smart Table
        this.settings = {
          actions: {
            columnTitle: 'Acciones',
            delete:false,
          },
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
          columns: {
            id: {
              title: 'ID',
              type: 'number',
              width: '100px',
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
            ci: {
              title: 'Cedula',
              type: 'number'
            },
          },
          };        
      }
  }

  getTrainers() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser.role == 'admin') {
      this.loadAllTrainers();
    } else if (currentUser.role == 'commission') {
      this.loadTrainersInComission(currentUser.id);
    }
  }
  
  loadAllTrainers(){
    this.trainersService.getTrainerList().subscribe(data=>{
      if (data){
        console.log('Recibiendo Entrenadores', data);
        this.trainerList = data;
        this.source.load(this.trainerList);
        this.spinner = false;

      }
    });
  }

  loadTrainersInComission(id) {
    console.log('Cargo los entrenadores en la comission');
    this.trainersService.getTrainersInCommission(id).subscribe(data => {
      console.log('Data: ', data);
      if (data) {
        this.trainerList = data;
        this.source.load(this.trainerList);
        this.spinner = false;
      }
    });
  }

  createTrainersForm(){
    this.edit = false;
    this.trainer = new TrainersModel();
    let navigationExtras: NavigationExtras = {
      queryParams: { trainer : this.trainer, edit : this.edit }
    };
    this.router.navigate(['pages/administration/trainers/form'], navigationExtras);
  }

  editTrainersForm(event){
    this.edit = true;
    //console.log(event.data)
    Object.assign(this.trainer,event.data) //Instance all fields of trainers with the event data
    let navigationExtras: NavigationExtras = {
      queryParams: { trainer : this.trainer, edit : this.edit  }
    };
    this.trainer.password = ""
    this.trainer.confirmPassword = ""
    this.router.navigate(['pages/administration/trainers/form'], navigationExtras);
  }

  openModal(dialog: TemplateRef<any>,event) {
    Object.assign(this.trainer,event.data) //Instance all fields of user with the event data
    this.dialogRef = this.dialogService.open(
      dialog,
      { context: this.trainer.name });
  }

  confirmDelete(dialog:TemplateRef<any>){
    this.trainersService.deleteTrainer(this.trainer).subscribe(data=>{
      if (data){
        if (!data.error){
          this.showToast('success','Se ha eliminado un entrenador exitosamente','Se ha eliminado el entrenador ' + this.trainer.name + ' de manera exitosa.')
          this.dialogRef.close();
          this.getTrainers();
        }else{
          this.showToast('danger','Hubo un error al eliminar el entrenador',data.error.error)
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


