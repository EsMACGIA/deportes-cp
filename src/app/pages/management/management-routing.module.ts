import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementComponent } from './management.component';

// Components
import { AthletesComponent } from './athletes/athletes.component'
import { AthletesFormComponent } from './athletes-form/athletes-form.component'
import { ClassesComponent } from './classes/classes.component'
import { ClassesFormComponent } from './classes-form/classes-form.component'
import { RequestsComponent } from './requests/requests.component'
import { RequestsFormComponent } from './requests-form/requests-form.component'

const routes: Routes = [{
  path: '',
  component: ManagementComponent,
  children: [
    {
      path: 'athletes',
      component: AthletesComponent
    },
    // {
    //   path: 'athletes-form',
    //   component: AthletesFormComponent
    // },
    {
      path: 'classes',
      component: ClassesComponent
    },
    // {
    //   path: 'classes-form',
    //   component: ClassesFormComponent
    // },
    {
      path: 'requests',
      component: RequestsComponent
    },
    {
      path: 'requests-form',
      component: RequestsFormComponent
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule { }

export const routedComponents = [
  ManagementComponent,
  AthletesComponent,
  AthletesFormComponent,
  ClassesComponent,
  ClassesFormComponent,
  RequestsComponent,
  RequestsFormComponent
];
