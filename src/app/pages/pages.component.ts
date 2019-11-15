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
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }

    if (localStorage.getItem('type') == '1') {
      this.menu = MENU_ADMIN;
    } else if (localStorage.getItem('type') == '2') {
      this.menu = MENU_COMMISSION;
    }

  }

}
