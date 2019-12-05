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

import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: ManagementComponent,
  children: [
    {
      path: 'athletes',
      component: AthletesComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin', 'commission'] }
    },
    {
      path: 'athletes-form',
      component: AthletesFormComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin', 'commission'] }
    },
    {
      path: 'classes',
      component: ClassesComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin', 'commission'] }
    },
    {
      path: 'classes-form',
      component: ClassesFormComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin', 'commission'] }
    },
    {
      path: 'requests',
      component: RequestsComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin', 'commission'] }
    },
    {
      path: 'requests-form',
      component: RequestsFormComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin', 'commission'] }
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
