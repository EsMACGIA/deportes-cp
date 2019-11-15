import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {ClassesService} from '../classes/classes.service';
import { ClassesModel } from '../classes/classes.model';

import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'classes-component',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {
  
  classList = [];

  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones'
    },
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
      trainer_name: {
        title: 'Nombres de Entrenador',
        type: 'string',
      },
      trainer_lastname: {
        title: 'Apellidos de Entrenador',
        type: 'string',
      },
      comission_name: {
        title: 'Comisión',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  //Var to difference if open edit or add
  private edit: boolean = false; 
  private clase : ClassesModel = new ClassesModel();
  private dialogRef : any;

  constructor(
    private router: Router,
    private classesService: ClassesService,) {
    const data = [
      {
        id: 1,
        description: 'Esta clase es de natación',
        trainer_id: 1,
        trainer_name: 'Manuel',
        trainer_lastname: 'Faria',
        trainer_ci: 1,
        trainer_email: 'mfaria724@gmail.com',
        comission_id: 1,
        comission_name: 'Natación'
        
      },
      {
        id: 2,
        description: 'Esta clase es de futbol',
        trainer_id: 1,
        trainer_name: 'Carlos',
        trainer_lastname: 'Rivero',
        trainer_ci: 1,
        trainer_email: 'carlosrivero@gmail.com',
        comission_id: 1,
        comission_name: 'Futbol'
        
      },
      

    ]
    //this.source.load(data);
    this.loadClasses();
    
  }

  loadClasses(){
    let data = this.classesService.getClassList().subscribe(data=>{
      if (data){
        console.log('Recibiendo Clases', data);
        this.classList = data;
        this.source.load(this.classList);
      }
    });
  }

  createClassForm() {
    this.edit = false;
    this.clase = new ClassesModel();
    let navigationExtras: NavigationExtras = {
      queryParams: { clase : this.clase, edit : this.edit }
    };
    this.router.navigate(['/pages/management/classes/form'], navigationExtras);
  }
  
  editClassForm(event) {
    this.edit = true;
    //console.log(event.data)
    Object.assign(this.clase,event.data) //Instance all fields of trainers with the event data
    let navigationExtras: NavigationExtras = {
      queryParams: { clase : this.clase, edit : this.edit  }
    };
    this.router.navigate(['pages/management/class/form'], navigationExtras);
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('¿Está seguro que desea eliminar esta clase?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
      
  }
}