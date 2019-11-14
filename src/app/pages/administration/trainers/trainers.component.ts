import { Component, PLATFORM_ID, Inject, Injector} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import {HttpClient} from '@angular/common/http';
import {TrainersService} from '../trainers/trainers.service';
import { Router, NavigationExtras } from '@angular/router';
import { TrainersModel } from '../../catalog/trainers/trainers.model';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss'],
})
export class TrainersComponent {

  trainerList = [];

  //Settings of Smart Table
  settings = {
    actions: {columnTitle: 'Acciones',},
    mode: 'external',
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
        title: 'Primer nombre',
        type: 'string',
      },
      lastname: {
        title: 'Apellido',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      ci: {
        title: 'Cedula',
        type: 'number'
      },
    },
  };

  //Variable to load info to smart table
  source: LocalDataSource = new LocalDataSource();

  //Var to difference if open edit or add
  private edit: boolean = false; 
  private trainer : TrainersModel = new TrainersModel();

  constructor(
    private service: SmartTableData,
    private http: HttpClient,
    private trainersService: TrainersService,
    private router: Router) {

      this.loadTrainers();
  }

  /*Load the Trainers to table */
/*
  loadTrainers(){
    this.trainersService.getTrainerList().subscribe(data=>{
      if (data){
        console.log('Estoy recibiendo los entrenadores',data)
        this.trainerList = data
        this.source.load(this.trainerList)
      }
    })
  }
*/

  loadTrainers(){
    let data = this.trainersService.getTrainerList().subscribe(data=>{
      if (data){
        console.log('Recibiendo Entrenadores', data);
        this.trainerList = data;
        this.source.load(this.trainerList);
      }
    });
  }

  createTrainersForm(){
    this.edit = false;
    this.trainer = new TrainersModel();
    let navigationExtras: NavigationExtras = {
      queryParams: { trainer : this.trainer }
    };
    this.router.navigate(['pages/administration/trainers/form'], navigationExtras);
  }

  editTrainersForm(event){
    this.edit = true;
    console.log(event.data)
    Object.assign(this.trainer,event.data) //Instance all fields of trainers with the event data
    let navigationExtras: NavigationExtras = {
      queryParams: { trainer : this.trainer }
    };
    delete this.trainer.password
    delete this.trainer.confirmPassword
    this.router.navigate(['pages/administration/trainers/form'], navigationExtras);
  }
}


