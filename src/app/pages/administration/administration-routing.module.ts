import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { AdministrationComponent } from './administration.component';
import {CommissionsComponent} from './commissions/commissions.component';
import {CommissionsFormComponent} from './commissions-form/commissions-form.component';
import { TrainersComponent } from './trainers/trainers.component';
import {TrainersFormComponent} from './trainers-form/trainers-form.component'
import {AssociateComponent} from './associate/associate.component'
import {AssociateCommissionComponent} from './associate-commission/associate-commission.component'
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [
    {
      path: 'commissions',
      component: CommissionsComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin'] }
    },
    {
      path : 'commissions/form',
      component : CommissionsFormComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin'] }
    },
    {
      path: 'trainers',
      component: TrainersComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin', 'commission'] }
    },
    {
      path: 'trainers/form',
      component: TrainersFormComponent,
      canActivate: [ AuthGuard ],
      data: { roles: ['admin', 'commission'] }
    },
    {
      path: 'associate',
      component: AssociateComponent,
      canActivate: [AuthGuard],
      data: { roles: ['admin']}
    },
    {
      path: 'associate/commission',
      component: AssociateCommissionComponent,
      canActivate: [AuthGuard],
      data: { roles: ['admin']}
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule { }

export const routedComponents = [
    AdministrationComponent,
    CommissionsComponent,
    CommissionsFormComponent,
    TrainersComponent,
    TrainersFormComponent,
    AssociateComponent,
    AssociateCommissionComponent
];
