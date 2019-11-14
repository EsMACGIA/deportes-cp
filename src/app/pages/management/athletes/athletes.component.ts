import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Router } from '@angular/router';

@Component({
  selector: 'athletes-component',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss'],
})
export class AthletesComponent {

  constructor(
    private router: Router
  ) {
    const data = [
      {
        id: 1,
        name: 'Manuel',
        lastname: 'Faria',
        sex: 'M',
        active: true,
        birthday: '2019-01-01',
        ci: 'V-25233305', 
        stock_number: 3258, 
      },
      {
        id: 2,
        name: 'Juan',
        lastname: 'Oropeza',
        sex: 'M',
        active: true,
        birthday: '2019-01-01',
        ci: 'V-26178140', 
        stock_number: 4523, 
      }
    ]
    this.source.load(data);
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

  source: LocalDataSource = new LocalDataSource();

  createAthlete(event) {
    this.router.navigate(['/pages/management/athletes-form'])
  }

  editAthlete(event) {
    console.log('Event: ', event)
  }

  onDeleteConfirm(event): void {
    if (window.confirm('¿Está seguro que desea eliminar este atleta?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
  