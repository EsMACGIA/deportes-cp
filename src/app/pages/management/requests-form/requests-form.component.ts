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
  // private request: RequestModel = this.router.getCurrentNavigation().extras.queryParams.request;
  // private request2: RequestModel = new RequestModel();

  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  sourceClasses: LocalDataSource = new LocalDataSource();
  sourceAthletes: LocalDataSource = new LocalDataSource();

  selectedClass: any;
  selectedAthlete: any;

  dialogRefClasses: any;
  dialogRefAthletes: any;

  athleteRequired = false;
  classRequired = false;

  settingsClasses = {
    mode: 'external',
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '100px'
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      comission_name: {
        title: 'Comisión',
        type: 'string',
      },
      trainer_name: {
        title: 'Nombre Entrenador',
        type: 'string',
      },
      trainer_lastname: {
        title: 'Apellido Entrenador',
        type: 'string',
      }
    },
  };

  settingsAthletes = {
    mode: 'external',
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      stock_number: {
        title: 'N° Acción',
        type: 'number',
      },
      name: {
        title: 'Nombres',
        type: 'string',
      },
      lastname: {
        title: 'Apellidos',
        type: 'string',
      },
      ci: {
        title: 'Cédula de Identidad',
        type: 'string',
      }
    },
  };

  retire: string;

  constructor (
    private classesService:ClassesService, 
    private athletesService:AthletesService, 
    private requestsService:RequestsService,
    private router:Router,
    private dialogService: NbDialogService, 
    private toastrService: NbToastrService
  ) {

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

  selectClass(dialog: TemplateRef<any>, event) {
    this.getClasses();
    this.dialogRefClasses = this.dialogService.open(
      dialog,
      { context: 'hola' }
    );
  }

  selectAthlete(dialog: TemplateRef<any>, event) {
    this.getAthletes();
    this.dialogRefAthletes = this.dialogService.open(
      dialog,
      { context: 'hola' }
    );
  }

  getAthletes() {
    this.athletesService.getAthletesList().subscribe(data => {
      if (data) {
        console.log('Data: ', data);
        this.sourceAthletes = data;
      }
    })
  }

  getClasses() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser.role == 'admin') {
      this.loadAllClasses();
    } else if (currentUser.role == 'commission') {
      this.loadClassesInCommission(currentUser.id);
    }
  }
  
  loadAllClasses() {
    this.classesService.getClassList().subscribe(data => {
      console.log('Pido todas las clases');
      console.log('Data: ', data);
      if (data) {
        this.sourceClasses = data;
      }
    })
  }

  loadClassesInCommission(id) {
    this.classesService.getClasses(id).subscribe(data => {
      console.log('Pido solo algunas clases porque soy comission')
      console.log('Data: ', data);
      if (data) {
        this.sourceClasses = data;
      }
    })
  }

  selectingClass(event) {
    this.classRequired = false;
    this.selectedClass = event.data;
    this.dialogRefClasses.close();
  }

  selectingAthlete(event) {
    this.athleteRequired = false;
    this.selectedAthlete = event.data;
    this.dialogRefAthletes.close();
  }

  sendRequest() {
    if (!this.selectedClass) {
      this.classRequired = true;
    } 
    
    if (!this.selectedAthlete) {
      this.athleteRequired = true;
    }

    if (!this.classRequired && !this.athleteRequired) {
      let payload = {
        class_id: this.selectedClass.id,
        athlete_id: this.selectedAthlete.id,
        retire: Boolean(this.retire),
        status: 'IN PROCESS'
      }
      console.log('Payload:', payload)

      this.requestsService.createRequest(payload).subscribe(data => {
        if (data) {
          this.toastrService.success('Solicitud Enviada con éxito', 'Solicitud enviada')
          console.log('Data: ', data);

          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if (currentUser.role == 'admin') {
            this.router.navigate(['/pages/management/requests'])
          } else {
            this.router.navigate(['/pages/management/requests-form'])
          }

        }
      });
    }

  }

}