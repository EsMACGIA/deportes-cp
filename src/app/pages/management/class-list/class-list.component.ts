import { Component, TemplateRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbComponentSize } from '@nebular/theme';

import { ExcelService } from './excel.service';
import { ClassesService } from '../classes/classes.service';

import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'class-list-component',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent {

  athletes: Array<any> = [
    {
      id: 1,
      name: 'Manuel',
      lastname: 'Faria',
      ci: 'V-25233305',
      stock_number: 1234
    },
    {
      id: 2,
      name: 'Wilfredo',
      lastname: 'Graterol',
      ci: 'V-25456123',
      stock_number: 5678
    },
    {
      id: 13,
      name: 'Juan',
      lastname: 'Oropeza',
      ci: 'V-14526123',
      stock_number: 9012
    }
  ];

  spinner = false;
  medium: NbComponentSize = 'medium';

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
      },
      sex: {
        title: 'Sexo',
        type: 'string',
      },
      birthday: {
        title: 'Fecha de Nacimiento',
        type: 'number',
      },
    },
  };

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

  sourceAthletes: LocalDataSource = new LocalDataSource();
  athletesArray: any[];
  sourceClasses: LocalDataSource = new LocalDataSource();

    
  private dialogRef : any;

  class = 'No seleccionada'
  currentClass;

  constructor(
    private excelService:ExcelService,
    private classesService: ClassesService,
    private dialogService: NbDialogService
  ) {
    this.getClasses();
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.athletesArray, 'listado_de_clases' + this.class);
  }

  getClasses() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'))

    if (currentUser.role == 'admin') {
      this.loadAllClasses();
    } else if (currentUser.role == 'commission') {
      this.loadClassesInCommission(currentUser.id);
    } else if (currentUser.role == 'trainer') {
      this.loadTrainerClasses(currentUser.id);
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
        delete this.settingsClasses.columns.comission_name;
      }
    })
  }

  loadTrainerClasses(id) {
    this.classesService.getTrainerClasses(id).subscribe(data => {
      console.log('Pido solo mis clases porque soy entrenador');
      console.log('Data: ', data);
      if (data) {
        this.sourceClasses = data;
        delete this.settingsClasses.columns.comission_name;
        delete this.settingsClasses.columns.trainer_name;
        delete this.settingsClasses.columns.trainer_lastname;
      }
    })
  }

  openModal(dialog: TemplateRef<any>,event) {
    this.dialogRef = this.dialogService.open(
      dialog,
      { context: 'hola' });
  }

  getAthletesInClass(id) {
    this.classesService.getAthletesInClass(id).subscribe(data => {
      if (data) {
        console.log('Data: ', data)
        this.sourceAthletes = data;
        this.athletesArray = data;
      }
    })
  }

  selectClass(event) {
    console.log('Select Class!');
    console.log('Event: ', event);

    this.class = event.data.description

    if (event.data.comission_name) {
      this.class += ' - ' + event.data.comission_name;
    }

    this.currentClass = event.data;

    this.getAthletesInClass(this.currentClass.id);

    this.dialogRef.close();
  }

}
  