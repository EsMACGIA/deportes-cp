import { Component } from '@angular/core';

import { MENU_ADMIN, MENU_COMMISSION, MENU_TRAINER } from './pages-menu';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_TRAINER;

  constructor(
    private router: Router
  ) {
    if (!localStorage.getItem('currentToken')) {
      this.router.navigate(['/']);
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser.role == 'admin') {
      this.menu = MENU_ADMIN;
    } else if (currentUser.role == 'commission') {
      this.menu = MENU_COMMISSION;
    } else if (currentUser.role == 'trainer') {
      this.menu = MENU_TRAINER;
    }

  }

}
