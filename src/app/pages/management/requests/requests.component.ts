import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Router } from '@angular/router';

@Component({
  selector: 'requests-component',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent {

  settings = {
    mode: 'external',
    actions: {
      edit: false,
      delete: false,
      columnTitle: 'Acciones'
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },

    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      athlete_stock_number: {
        title: 'N° Acción',
        type: 'number',
      },
      athlete_name: {
        title: 'Nombre de Atleta',
        type: 'string',
      },
      athlete_lastname: {
        title: 'Apellido de Atleta',
        type: 'string',
      },
      athlete_ci: {
        title: 'Cédula de Identidad',
        type: 'string',
      },
      athlete_sex: {
        title: 'Sexo',
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
        athlete_stock_number: 354,
        athlete_name: 'Manuel',
        athlete_lastname: 'Faria',
        athlete_sex: 'M',
        athlete_birthday: '2019-01-01',
        athlete_ci: 'V-25233305', 
        comission_id: 1,
        comission_name: 'Natación',
        class_description: 'Clase de adultos'
      },
    ]
    this.source.load(data);
  }

  createRequest(event) {
    this.router.navigate(['/pages/management/requests-form'])
  }
}