import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
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

  constructor(
    private router: Router
  ) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  menu = MENU_ITEMS;
}
