import { Component } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'ngx-smart-table',
    templateUrl: './commissions-form.component.html',
    styleUrls: ['./commissions-form.component.scss'],
  })
export class CommissionsFormComponent {

    //Settings for Smart Table
  settings = {
    actions: {columnTitle: 'Acciones',},
    mode:'external',
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
      name: {
        title: 'Nombre',
        type: 'string',
      },
      email:{
          title: 'Correo electrónico',
          type: 'string',
      },
    },
  };

  constructor() {
    }

}