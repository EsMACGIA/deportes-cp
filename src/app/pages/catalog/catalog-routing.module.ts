import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogComponent } from './catalog.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{
  path: '',
  component: CatalogComponent,
  children: [
    {
      path: 'users',
      component: UsersComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule { }

export const routedComponents = [
  CatalogComponent,
  UsersComponent
];
