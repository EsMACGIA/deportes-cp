import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {TrainersService} from '../../administration/trainers/trainers.service'
import { ClassesService } from '../classes/classes.service';
import { ClassesModel } from '../classes/classes.model';
import {Router} from '@angular/router'

@Component({
  selector: 'classes-form-component',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss'],
})
export class ClassesFormComponent {
  private trainers = [];
  private clase : ClassesModel = this.router.getCurrentNavigation().extras.queryParams.clase;
  private edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;
  type: string = 'edit';
  cardTitle: string = ''; 

  constructor (
    private router:Router,
    private classesService : ClassesService,
    private trainersService: TrainersService) {
    if (this.type == 'add') {
      this.cardTitle = 'Agrega Clase';
    } else if (this.type == 'edit'){
      this.cardTitle = 'Editar Clase';
    }
  }

  ngOnInit() {
    this.trainersService.getTrainerList().subscribe(data =>{
      this.trainers = data;
    });
  }

  addClassForm(classForm:NgForm){
    if (classForm.valid){ 
      this.clase.comission_id = 23;
      this.classesService.createClass(this.clase).subscribe(data=>{
          if (data && !data.error){
              console.log("Yay")
              //this.showToast('success','Se ha creado un entrenador exitosamente','Se ha creado el entrenador ' + this.trainer2.name + ' de manera exitosa.')
              this.router.navigate(['/pages/management/classes']);
          }
          else {
              console.log(data.error)
              //this.showToast('danger','Hubo un error al crear entrenador',data.error.error)
              this.router.navigate(['/pages/management/classes']);
          }
      });
    }
  }

  editTrainerForm(trainerForm:NgForm){
    if (trainerForm.valid){ 
      //console.log(this.clase)
      this.classesService.updateClass(this.clase).subscribe(data=>{
          if (data && !data.error){
              console.log("Yay")
              //this.showToast('success','Se ha modificado un entrenador exitosamente','Se ha modificado el entrenador ' + this.trainer2.name + ' de manera exitosa.')
              this.router.navigate(['/pages/management/classes']);
          }
          else {
              console.log(data.error)
              //this.showToast('danger','Hubo un error al modificar entrenador',data.error.error)
              this.router.navigate(['/pages/manahement/classes']);
          }
      });
    }
}
}
  