import { Component } from '@angular/core';
import { CommissionsModel } from './commissions.model';

import { LocalDataSource } from 'ng2-smart-table';

import {Router} from'@angular/router';

@Component({
    selector: 'ngx-smart-table',
    templateUrl: './commissions.component.html',
    styleUrls: ['./commissions.component.scss'],
  })
export class CommissionsComponent {

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

    //Variable to Load info to Smart Table
    source: LocalDataSource = new LocalDataSource();

  constructor(private router: Router,) {
    this.loadCommissions();
    }

    loadCommissions(){
      const data:CommissionsModel[] = [
        {id: 1,
        name : 'Futbol',
        email : 'com-futbol@cp.com',
        password : '12345678'},
        {id: 2,
          name : 'Natación',
          email : 'com-natacion@cp.com',
          password : '12345678'},
        {id: 3,
            name : 'Karate',
            email : 'com-karate@cp.com',
            password : '12345678'},
  
      ]
      this.source.load(data);
    }

    goToComissionForm(){
      console.log('mmmm')
      this.router.navigate(['/pages/administration/commissions/form']);
    }
}