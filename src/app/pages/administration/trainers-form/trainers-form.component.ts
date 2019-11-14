import { Component} from '@angular/core';
import {NgForm} from '@angular/forms';
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
    private trainer : TrainersModel = this.router.getCurrentNavigation().extras.queryParams.trainer;
    private match : boolean;

  constructor(
        private trainersService:TrainersService, 
        private trainersModel:TrainersModel,
        private router:Router) {
    }

    addTrainerForm(trainerForm:NgForm){
        if (trainerForm.valid){
            if(trainerForm.value.password == trainerForm.value.confirm_password){
                this.match = true;
            }else{
                this.match = false;
            }
            if (this.match){
                this.trainersService.createTrainer(this.trainer).subscribe(data=>{
                    console.log(this.trainer)
                    if (data && !data.error){
                        console.log("Yay")
                    }
                });
            }
        }
        this.router.navigate(['/pages/administration/trainers']);
    }
    editTrainerForm(trainerForm:NgForm){
        this.trainersService.updateTrainer(this.trainer);
        this.router.navigate(['/pages/administration/trainers']);
    }

}