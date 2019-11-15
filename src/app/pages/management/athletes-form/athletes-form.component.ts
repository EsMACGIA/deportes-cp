import { Component } from '@angular/core';

@Component({
  selector: 'athletes-form-component',
  templateUrl: './athletes-form.component.html',
  styleUrls: ['./athletes-form.component.scss'],
})
export class AthletesFormComponent {

  type: string = 'edit';
  cardTitle: string = '';

  constructor () {
    if (this.type == 'add') {
      this.cardTitle = 'Agrega Atleta';
    } else if (this.type == 'edit'){
      this.cardTitle = 'Editar Atleta';
    }
  }

  createAthlete() {
    console.log('Create Athlete!');
  }
}
  