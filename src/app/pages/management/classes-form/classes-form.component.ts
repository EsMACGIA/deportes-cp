import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition, NbToast} from '@nebular/theme';
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
  trainers = [];
  clase : ClassesModel = this.router.getCurrentNavigation().extras.queryParams.clase;
  clase2: ClassesModel = new ClassesModel();
  edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;
  type: string = 'edit';
  cardTitle: string = ''; 


  //Variables to Toastr configuration
  config:ToasterConfig;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1; 
  preventDuplicates = false;

  constructor (
    private router:Router,
    private classesService : ClassesService,
    private trainersService: TrainersService,
    private toastrService: NbToastrService) {
  }

  ngOnInit() {
    this.trainersService.getTrainerList().subscribe(data =>{
      this.trainers = data;
    });
  }

  addClassForm(classForm:NgForm){
    if (classForm.valid){ 
      this.clase.comission_id = 29;
      this.clase.schedules = [];
      this.clase.trainer_id = Number(this.clase.trainer_id)
      console.log(this.clase);
      this.classesService.createClass(this.clase).subscribe(data=>{
          if (data && !data.error){
              console.log("Yay")
              this.showToast('success','Se ha creado una clase exitosamente','Se ha creado la clase ' + this.clase.description + ' de manera exitosa.')
              this.router.navigate(['/pages/management/classes']);
          }
          else {
              console.log(data.error)
              this.showToast('danger','Hubo un error al crear clase',data.error.error)
              this.router.navigate(['/pages/management/classes']);
          }
      });
    }
  }

  editClassForm(classForm:NgForm){
    if (classForm.valid){ 
      this.clase2 = new ClassesModel();
      this.clase2.id = this.clase.id;
      this.clase2.description = this.clase.description;
      delete this.clase2.comission_id;
      delete this.clase2.schedules;
      delete this.clase2.trainer_id;
      console.log(this.clase2)
      this.classesService.updateClass(this.clase2).subscribe(data=>{
          if (data && !data.error){
              console.log("Yay")
              this.showToast('success','Se ha modificado una clase exitosamente','Se ha modificado la clase ' + this.clase2.description + ' de manera exitosa.')
              this.router.navigate(['/pages/management/classes']);
          }
          else {
            console.log(data.error)
            this.showToast('danger','Hubo un error al modificar la clase',data.error.error)
            this.router.navigate(['/pages/management/classes']);
          }
      });
    }
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.index += 1;
    this.toastrService.show(
      body,
      title,
      config);
  }

}
  