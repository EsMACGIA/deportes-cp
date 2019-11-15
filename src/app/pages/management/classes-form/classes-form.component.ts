import { Component } from '@angular/core';

@Component({
  selector: 'classes-form-component',
  templateUrl: './classes-form.component.html',
  styleUrls: ['./classes-form.component.scss'],
})
export class ClassesFormComponent {

  type: string = 'edit';
  cardTitle: string = '';

  constructor () {
    if (this.type == 'add') {
      this.cardTitle = 'Agrega Clase';
    } else if (this.type == 'edit'){
      this.cardTitle = 'Editar Clase';
    }
  }

  createClass() {
    console.log('Create Class!');
  }
}
  