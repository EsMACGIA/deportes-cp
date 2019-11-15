import { Component } from '@angular/core';
//Services
import {ClassesService} from '../classes/classes.service';
//Models
import {RequestModel} from '../requests/request.model';
import {AthletesModel} from '../athletes/athletes.model'
@Component({
  selector: 'requests-form-component',
  templateUrl: './requests-form.component.html',
  styleUrls: ['./requests-form.component.scss'],
})
export class RequestsFormComponent {

  type: string = 'edit';
  cardTitle: string = '';
  request:RequestModel = new RequestModel(); 
  athletesLists:AthletesModel[] = [
    {
      id : 3,
      name : "Juan",
      lastname : "Perez",
      active : true,
      sex: "M",
      birthday: "15/01/1995",
      ci : "V-23435432",
      stock_number: 2,    
    },
  ];

  classList = [];


  constructor (private classesService:ClassesService) {
    if (this.type == 'add') {
      this.cardTitle = 'Agrega Solicitud';
    } else if (this.type == 'edit'){
      this.cardTitle = 'Editar Solicitud';
    }

    this.loadClasses();
  }

  loadClasses(){
    let data = this.classesService.getClassList().subscribe(data=>{
      if (data){
        console.log('Recibiendo Clases', data);
        this.classList = data;
        return this.classList
      }
    });
  }

  createRequest() {
    console.log('Create Request!');
  }
}
  