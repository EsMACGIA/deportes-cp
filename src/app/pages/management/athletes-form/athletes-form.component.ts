import { Component } from '@angular/core';

//Services
import {AthletesService} from '../athletes/athletes.service';

//Models
import {AthletesModel} from '../athletes/athletes.model';

import {Router} from '@angular/router'
import { ToasterConfig } from 'angular2-toaster';
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'athletes-form-component',
  templateUrl: './athletes-form.component.html',
  styleUrls: ['./athletes-form.component.scss'],
})
export class AthletesFormComponent {

  athlete : AthletesModel = this.router.getCurrentNavigation().extras.queryParams.athlete;
  edit : boolean = this.router.getCurrentNavigation().extras.queryParams.edit;
  formTitle : String;
  
  //Toastr configuration
  config:ToasterConfig;
  position:NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbComponentStatus = 'success'
  duration = 4000;
  destroyByClick = false;
  hasIcon = true;
  index = 1;
  preventDuplicates = false;

  constructor(private athletesService:AthletesService, private athleteModel:AthletesModel,
    private router:Router, private toastrService: NbToastrService) {}

    ngOnInit(){
      if (this.edit){
        this.formTitle = "Editar Atleta"
      }
      else{
        this.formTitle = "Agregar Atleta"
      }
    }

    addAthleteForm(athleteForm:NgForm){
      console.log(this.athlete)
      if (athleteForm.valid){
        if (!this.athlete.ci) this.athlete.ci = ""
        this.athletesService.createAthletes(this.athlete).subscribe(data=>{
          if (data){
            if (!data.error){
              console.log(data)
              this.showToast('success','Se ha agregado un atleta exitosamente','Se ha agregado al atleta ' + this.athlete.name + ' ' + this.athlete.lastname + ' de manera exitosa.')
              this.router.navigate(['/pages/management/athletes']);
  
            }else{
              this.showToast('danger','Hubo un error al agregar al atleta',data.error.error)
              this.router.navigate(['/pages/management/athletes']);
              console.log(data.error.error)
              console.log(data.error)
            }
          }
        });
      }
    }

    editAthletesForm(athletesForm:NgForm){
      console.log(this.athlete)
      if (athletesForm.valid){ 
        if (!this.athlete.ci) this.athlete.ci = ""
        this.athletesService.updateAthlete(this.athlete).subscribe(data=>{
          if (data && !data.error){
              this.showToast('success','Se ha modificado un atleta exitosamente','Se ha modificado el atleta ' + this.athlete.name + ' ' + this.athlete.lastname + ' de manera exitosa.')
              this.router.navigate(['/pages/management/athletes']);
          }
          else {
              console.log(data.error)
              this.showToast('danger','Hubo un error al modificar al atleta',data.error.error)
              console.log(data.error.error)
              this.router.navigate(['/pages/management/athletes']);
          }
        });
      }
      
    }

    private showToast(type: NbComponentStatus, title: string, body: string){
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