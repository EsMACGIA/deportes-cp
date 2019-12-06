import { Component, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
//Services
import {ClassesService} from '../classes/classes.service';
import {AthletesService} from '../athletes/athletes.service';
import {RequestsService} from '../requests/requests.service';
//Models
import { NbDialogService } from '@nebular/theme';
import {RequestModel} from '../requests/request.model';
import {AthletesModel} from '../athletes/athletes.model'
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router'
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';


@Component({
  selector: 'requests-form-component',
  templateUrl: './requests-form.component.html',
  styleUrls: ['./requests-form.component.scss'],
})
export class RequestsFormComponent {

  type: string = 'edit';
  cardTitle: string = '';
  private match : boolean = true;
  private edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;
  private request: RequestModel = this.router.getCurrentNavigation().extras.queryParams.request;
  private request2: RequestModel = new RequestModel();
  private athletesList:AthletesModel[];
  private tempAthletesList:AthletesModel[];
  private classesList:AthletesModel[];
  private tempClassesList:AthletesModel[];

  private athletes = [
    {
      birthday: "2009-04-06T00:00:00.000Z",
      ci: "",
      id: 21,
      lastname: "Castro",
      name: "Aurivan",
      sex: "F",
      stock_number: 672
    },
    {
      birthday: "2009-04-06T00:00:00.000Z",
      ci: "",
      id: 22,
      lastname: "Castro",
      name: "Juan",
      sex: "H",
      stock_number: 673
    },
    {
      birthday: "2009-04-06T00:00:00.000Z",
      ci: "",
      id: 23,
      lastname: "Castro",
      name: "Jose",
      sex: "H",
      stock_number: 674
    },
  ]
  private classes = [
    {
      id : 5,
      description: "descripcion",
      commision_id: 1,
      schedules: [1,2],
      trainder_id: 0 
      
    },
  ]

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

  // classList = [];
  // athletesList = [];

  //Toastr configuration
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  private currentUser : any;
  private type_user : string;
  private dialogRef : any;

  //Variable to load info to smart table
  source: LocalDataSource = new LocalDataSource();
  //Variable to load info of all athletes
  source2 : LocalDataSource = new LocalDataSource();

  constructor (private classesService:ClassesService, private athletesService:AthletesService, private requestsService:RequestsService,
     private router:Router,private dialogService: NbDialogService, private toastrService: NbToastrService) {
      console.log(this.edit);
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
          console.log(this.currentUser)
          this.type_user = this.currentUser.role
          console.log(this.currentUser.role)
            this.source.load(this.athletes)
    if (this.type == 'add') {
      this.cardTitle = 'Agrega Solicitud';
    } else if (this.type == 'edit'){
      this.cardTitle = 'Editar Solicitud';
    }

    // this.loadClasses();
    // this.loadAthletes();
  }

  // loadClasses(){
  //   let data = this.classesService.getClassList().subscribe(data=>{
  //     if (data){
  //       console.log('Recibiendo Clases', data);
  //       this.classList = data;
  //       return this.classList
  //     }
  //   });
  // }

  // loadAthletes(){
  //   let data = this.athletesService.getAthletesList().subscribe(data=>{
  //     if (data){
  //       console.log('Recibiendo Clases', data);
  //       this.athletesList = data;
  //       return this.athletesList
  //     }
  //   });
  // }

  addRequestForm(requestForm:NgForm){
    if (requestForm.valid){
      console.log('Entree aca')
      Object.assign(this.request2, this.request)
      this.request2.status = 'IN PROCESS';
      this.request2.athlete_id = Number(this.request2.athlete_id)
      this.request2.class_id = Number(this.request2.class_id)
      console.log('El retire de request 2 es: ',this.request2.retire)
      // this.request2.retire = (this.request2.retire == 'true');
      console.log("El retire de request 2 CASTEADO", this.request2.retire)  // == true
      console.log('Estoy enviando: ',this.request2)
      
      // if (this.request2.retire == "1"){
      //   this.request2.retire = true
      // }else{
      //   this.request2.retire = false;
      // }
      console.log(this.request2.retire)

      this.request = Object.assign(this.request2);
        this.requestsService.createRequest(this.request2).subscribe(data=>{
        if (data){
          if (!data.error){
            console.log(data)
            this.showToast('success','Se ha creado una solicitud exitosamente','Se ha creado la solicitud ' + this.request.id + ' de manera exitosa.')
            this.router.navigate(['/pages/management/requests']);

          }else{
            this.showToast('danger','Hubo un error al crear solicitud',data.error.error)
            this.router.navigate(['/pages/management/requests']);
            console.log(data.error.error)
          }
          }
        });
      }
      
  }

  editRequestForm(requestForm:NgForm){
        Object.assign(this.request2, this.request)
            console.log('MMM')
            console.log("Comision2",this.request2)
            this.requestsService.updateRequest(this.request2).subscribe(data=>{
                if (data && !data.error){
                    console.log("Yay")
                    this.showToast('success','Se ha modificado una comisión exitosamente','Se ha modificado la comisión ' + this.request.id + ' de manera exitosa.')
                    this.router.navigate(['/pages/administration/commissions']);
                }
                else {
                    console.log(data.error)
                    this.showToast('danger','Hubo un error al modificar la comisión',data.error.error)
                    console.log(data.error.error)
                    this.router.navigate(['/pages/administration/commissions']);
                }
            });
        
    
    
    
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

loadAllAthletes(){
  this.athletesService.getAthletesList().subscribe( data =>{
    if (data){
      if (!data.error){
        this.athletesList = data;
        for (let i = 0;i<this.athletes.length;i++){
          for (let j = 0;j<this.athletesList.length;j++){
            if(this.athletes[i].id == this.athletesList[j].id){
              console.log('Test')
              this.athletesList.splice(j,1)
            }
          }
        }
        this.source2.load(this.athletesList);
      }else{
        this.showToast('danger','Hubo un error al cargar los atletas',data.error.error)
      }
    }
  }
  )
}

loadAllClasses(){
  this.classesService.getClassList().subscribe( data =>{
    if (data){
      if (!data.error){
        this.classesList = data;
        for (let i = 0;i<this.classes.length;i++){
          for (let j = 0;j<this.classesList.length;j++){
            if(this.classes[i].id == this.classesList[j].id){
              console.log('Test')
              this.classesList.splice(j,1)
            }
          }
        }
        this.source2.load(this.classesList);
      }else{
        this.showToast('danger','Hubo un error al cargar las clases',data.error.error)
      }
    }
  }
  )
}


openModal(dialog: TemplateRef<any>,event) {
  this.tempAthletesList = [];
  this.loadAllAthletes();
  Object.assign(this.request,event.data) //Instance all fields of user with the event data
  this.dialogRef = this.dialogService.open(
    dialog,
    { context: 'hola' });
}
openModal2(dialog: TemplateRef<any>,event) {
  this.tempClassesList = [];
  this.loadAllClasses();
  Object.assign(this.request,event.data) //Instance all fields of user with the event data
  this.dialogRef = this.dialogService.open(
    dialog,
    { context: 'hola' });
}

selectAthlete(event){
  console.log(event)
}
}