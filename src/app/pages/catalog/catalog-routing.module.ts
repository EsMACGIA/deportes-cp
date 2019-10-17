import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from './catalog.component';
import { UserComponent } from './users/users.component';

const routes: Routes = [{
  path: '',
  component: CatalogComponent,
  children: [
    {
      path: 'users',
      component: UserComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  CatalogComponent,
  UserComponent
];
