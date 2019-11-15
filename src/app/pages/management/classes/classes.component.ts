import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Router } from '@angular/router';

@Component({
  selector: 'classes-component',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {

  createClass() {
    this.router.navigate(['/pages/management/classes-form']);
  }
  
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

  constructor(private router: Router) {
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
    this.source.load(data);
  }

  editClass(event) {
    console.log('Event: ', event)
  }

  onDeleteConfirm(event): void {
    if (window.confirm('¿Está seguro que desea eliminar esta clase?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
  