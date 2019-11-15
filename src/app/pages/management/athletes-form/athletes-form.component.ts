import { Component } from '@angular/core';

//Models
import {AthletesModel} from '../athletes/athletes.model';
import {Router} from '@angular/router'
import {NbToastrService,NbComponentStatus,NbGlobalLogicalPosition, NbGlobalPosition, NbGlobalPhysicalPosition} from '@nebular/theme';

@Component({
  selector: 'athletes-form-component',
  templateUrl: './athletes-form.component.html',
  styleUrls: ['./athletes-form.component.scss'],
})
export class AthletesFormComponent {

  private athlete:AthletesModel = new AthletesModel();

  type: string = 'edit';
  cardTitle: string = '';

  constructor (private athleteModel:AthletesModel, private router:Router) {
    if (this.type == 'add') {
      this.cardTitle = 'Agrega Atleta';
    } else if (this.type == 'edit'){
      this.cardTitle = 'Editar Atleta';
    }
  }

  addAthleteForm(athleteForm){
    if (athleteForm.valid){
      console.log('AJa')
    } else {
      console.log(athleteForm.error);
    }
  }

  createAthlete() {
    console.log('Create Athlete!');
  }
}
  