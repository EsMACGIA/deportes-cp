import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';
//Services
import {TrainersService} from '../trainers/trainers.service';
//Models
import {TrainersModel} from '../trainers/trainers.model';
import {Router} from '@angular/router'

@Component({
    selector: 'ngx-trainers-form',
    templateUrl: './trainers-form.component.html',
    styleUrls: ['./trainers-form.component.scss'],
  })

export class TrainersFormComponent {
    trainer : TrainersModel = this.router.getCurrentNavigation().extras.queryParams.trainer;
    trainer2:TrainersModel = new TrainersModel();
    match : boolean = true;
    edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;

    //Variables to Toastr configuration
    config:ToasterConfig;
    position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    status: NbComponentStatus = 'success'
    duration = 4000;
    destroyByClick = false;
    hasIcon = true;
    index = 1; 
    preventDuplicates = false;

  constructor(
        private trainersService:TrainersService, 
        private trainersModel:TrainersModel,
        private router:Router,
        private toastrService: NbToastrService) {
    }

    addTrainerForm(trainerForm:NgForm){
        if (trainerForm.valid){ 
            if(trainerForm.value.password == trainerForm.value.confirm_password){
                this.match = true;
            }else{
                this.match = false;
            }
            Object.assign(this.trainer2, this.trainer)
            if (this.match){
                delete this.trainer2.confirmPassword;
                this.trainersService.createTrainer(this.trainer2).subscribe(data=>{
                    if (data && !data.error){
                        console.log("Yay")
                        this.showToast('success','Se ha creado un entrenador exitosamente','Se ha creado el entrenador ' + this.trainer2.name + ' de manera exitosa.')
                        this.router.navigate(['/pages/administration/trainers']);
                    }
                    else {
                        console.log(data.error)
                        this.showToast('danger','Hubo un error al crear entrenador',data.error.error)
                        this.router.navigate(['/pages/administration/trainers']);
                    }
                });
            }
        }
    }
    editTrainerForm(trainerForm:NgForm){
        if (trainerForm.valid){ 
            if(trainerForm.value.password == trainerForm.value.confirm_password){
                this.match = true;
            }else{
                this.match = false;
            }
            Object.assign(this.trainer2, this.trainer)
            if (this.match){
                delete this.trainer2.confirmPassword;
                delete this.trainer2.ci;
                delete this.trainer2.email;
                //console.log(this.trainer2)
                this.trainersService.updateTrainer(this.trainer2).subscribe(data=>{
                    if (data && !data.error){
                        console.log("Yay")
                        this.showToast('success','Se ha modificado un entrenador exitosamente','Se ha modificado el entrenador ' + this.trainer2.name + ' de manera exitosa.')
                        this.router.navigate(['/pages/administration/trainers']);
                    }
                    else {
                        console.log(data.error)
                        this.showToast('danger','Hubo un error al modificar entrenador',data.error.error)
                        this.router.navigate(['/pages/administration/trainers']);
                    }
                });
            }
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