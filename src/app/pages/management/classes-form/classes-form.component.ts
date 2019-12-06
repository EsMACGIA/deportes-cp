import { Component,TemplateRef } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToast} from '@nebular/theme';
import {TrainersService} from '../../administration/trainers/trainers.service'
import { ClassesService } from '../classes/classes.service';
import {CommissionsService} from '../../administration/commissions/commissions.service';
import { ClassesModel } from '../classes/classes.model';
import {Router} from '@angular/router'
import { NbComponentSize } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';


//Models
import {TrainersModel} from '../../administration/trainers/trainers.model';
import { CommissionsModel } from '../../administration/commissions/commissions.model';
@Component({
  selector: 'classes-form-component',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss'],
})
export class ClassesFormComponent {
  trainers = [];
  clase : ClassesModel = this.router.getCurrentNavigation().extras.queryParams.clase;
  clase2: ClassesModel = new ClassesModel();
  edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;
  type: string = 'edit';
  cardTitle: string = '';
  public trainer:TrainersModel;
  medium: NbComponentSize = 'medium';
  public dialogRef : any;
  public trainerList:TrainersModel[];
  source: LocalDataSource = new LocalDataSource();





  //Variables to Toastr configuration
  config:ToasterConfig;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1; 
  preventDuplicates = false;
  settingsTrainers = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      add: false,
      delete: false,
      },
    edit: {
      editButtonContent: '<i class="nb-plus"></i>',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '100px'
      },
      name: {
        title: 'Nombre Entrenador',
        type: 'string',
      },
      lastname: {
        title: 'Apellido Entrenador',
        type: 'string',
      }
    },
  };

  settingsSchedules = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    add:{
      addButtonContent: '<i class="nb-plus"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      weekday: {
        title: 'Dia de la semana',
        type: 'string',
      },
      start_hour: {
        title: 'Hora inicio',
        type: 'string',
      },
      end_hour: {
        title: 'Hora final',
        type: 'string',
      }
    },
  };

  settingsCommissions = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
      add: false,
      delete: false,
      },
    edit: {
      editButtonContent: '<i class="nb-plus"></i>',
    },
    columns: {
      id: {
        name: 'ID',
        type: 'string',
      },
      name: {
        name: 'Nombre',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
    },
  };

  public hours:number[] = [];
  public minutes:number[] = []
  public weekday:number;
  public start_hour:number;
  public end_hour:number;
  public start_minute:number;
  public end_minute:number;
  public start_meridian:string;
  public end_meridian:string;
  public schedules:any[] = [];
  public sourceSchedules:LocalDataSource = new LocalDataSource();
  public sourceCommission:LocalDataSource = new LocalDataSource();
  public currentUser:any
  public type_user:string
  public commission:CommissionsModel = new CommissionsModel();
  public commissionList:CommissionsModel[];
  constructor (
    private router:Router,
    private classesService : ClassesService,
    private trainersService: TrainersService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService,
    private commissionService:CommissionsService
    ) {
      for (let i =1; i<=12;i++){
        this.hours[i] = i
      }
      for (let i = 0; i<=59;i++){
        this.minutes[i] = i
      }
      this.getTrainers();
      if (!this.edit){
        this.trainer = new TrainersModel();
      }
      

      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      console.log(this.currentUser)
      this.type_user = this.currentUser.role
      if (this.type_user == 'admin'){
        this.loadCommissions();
      }
  }

  ngOnInit() {
    this.trainersService.getTrainerList().subscribe(data =>{
      this.trainers = data;
    });
  }

  addClassForm(classForm:NgForm){
    if (classForm.valid){ 
      if (this.type_user == 'admin'){
        this.clase.comission_id = this.commission.id
      }else{
        this.clase.comission_id = this.currentUser.id
      }
      this.clase.schedules = this.schedules
      this.clase.trainer_id = this.trainer.id
      console.log(this.clase);
      this.classesService.createClass(this.clase).subscribe(data=>{
          if (data && !data.error){
              console.log("Yay")
              this.showToast('success','Se ha creado una clase exitosamente','Se ha creado la clase ' + this.clase.description + ' de manera exitosa.')
              this.router.navigate(['/pages/management/classes']);
          }
          else {
              console.log(data.error)
              this.showToast('danger','Hubo un error al crear clase',data.error.error)
              this.router.navigate(['/pages/management/classes']);
          }
      });
    }
  }

  editClassForm(classForm:NgForm){
    if (classForm.valid){ 
      this.clase2 = new ClassesModel();
      this.clase2.id = this.clase.id;
      this.clase2.description = this.clase.description;
      delete this.clase2.comission_id;
      delete this.clase2.schedules;
      delete this.clase2.trainer_id;
      console.log(this.clase2)
      this.classesService.updateClass(this.clase2).subscribe(data=>{
          if (data && !data.error){
              console.log("Yay")
              this.showToast('success','Se ha modificado una clase exitosamente','Se ha modificado la clase ' + this.clase2.description + ' de manera exitosa.')
              this.router.navigate(['/pages/management/classes']);
          }
          else {
            console.log(data.error)
            this.showToast('danger','Hubo un error al modificar la clase',data.error.error)
            this.router.navigate(['/pages/management/classes']);
          }
      });
    }
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

  loadCommissions(){
    this.commissionService.getCommissionsList().subscribe(data=>{
      if (data){
        if (!data.error){
          this.commissionList = data;
          this.sourceCommission.load(this.commissionList)
        }
      }
    })
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
      }
    });
  }

  openModal(dialog: TemplateRef<any>,event) {
    this.dialogRef = this.dialogService.open(
      dialog,
      { context: 'hola' });
  }

  addTrainer(event){
    this.trainer = event.data
    this.dialogRef.close();
  }

  addCommision(event){
    this.commission = event.data
    this.dialogRef.close();
  }

  addSchedule(dialog2: TemplateRef<any>){
    this.dialogRef = this.dialogService.open(
      dialog2,
      {context: 'hola'});
    
  }

  saveTime(){
    this.dialogRef.close();
    let start_hour:string;
    let end_hour:string
    if (this.start_meridian=='pm'){
      this.start_hour = Number(this.start_hour) + 12;
    }
    if (this.end_meridian=='pm'){
      this.end_hour = Number(this.end_hour) + 12;
    }

    start_hour = this.start_hour + ":" + this.start_minute
    end_hour = this.end_hour + ":" + this.end_minute
    this.start_hour = this.start_hour - 12;
    this.end_hour = this.end_hour - 12;

    if (!this.edit){
      let schedule = {
        'weekday' : Number(this.weekday),
        'start_hour' : start_hour,
        'end_hour' : end_hour,
      } 
      this.schedules.push(schedule)
      this.sourceSchedules.load(this.schedules)
    }
  }

}
  