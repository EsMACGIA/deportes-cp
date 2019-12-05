import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { Router,NavigationExtras  } from '@angular/router';

import {RequestModel} from './request.model';
import {RequestsService} from './requests.service';

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
        width: '100px'
      },
      birthday: {
        title: 'Fecha de nacimiento',
        type: 'string',
      },
      ci: {
        title: 'Cedula',
        type: 'string',
      },
      lastname: {
        title: 'Apellido de Atleta',
        type: 'string',
      },
      name: {
        title: 'Nombre de Atleta',
        type: 'string',
      },
      sex: {
        title: 'Sexo',
        type: 'string',
      },
      status: {
        title: 'Estado',
        type: 'string',
      },
      stock_number: {
        title: 'Acción',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  private edit: boolean;
  private request: RequestModel;
  private requestsList : any;
  constructor(private router: Router, private requestsService:RequestsService) {
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
    this.loadRequest();
  }

  loadRequest(){
    let data = this.requestsService.getRequestsList().subscribe(data=>{
      if (data){
        this.requestsList = data
        this.source.load(this.requestsList)
        console.log(this.requestsList);
      }
    });
  }

  createRequest(event) {
    this.edit = false;
    this.request = new RequestModel();
    let navigationExtras: NavigationExtras = {
      queryParams: { request : this.request, edit : this.edit }
    };
    this.router.navigate(['/pages/management/requests-form'], navigationExtras)
  }
}