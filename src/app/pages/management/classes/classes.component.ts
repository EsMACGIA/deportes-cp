import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'classes-component',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent {

  constructor(private router: Router) {}

  createClass() {
    this.router.navigate(['/pages/management/classes-form']);
  }
}
  