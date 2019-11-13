import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './management.component';


const routes: Routes = [{
  path: '',
  component: ManagementComponent,
  children: [
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }

export const routedComponents = [
    ManagementComponent,
];
