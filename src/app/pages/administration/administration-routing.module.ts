import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { AdministrationComponent } from './administration.component';
import {CommissionsComponent} from './commissions/commissions.component';
import {CommissionsFormComponent} from './commissions-form/commissions-form.component';
import { TrainersComponent } from './trainers/trainers.component';
import {TrainersFormComponent} from './trainers-form/trainers-form.component'

const routes: Routes = [{
  path: '',
  component: AdministrationComponent,
  children: [
    {
      path: 'commissions',
      component: CommissionsComponent
    },
    {
      path : 'commissions/form',
      component : CommissionsFormComponent,
    },
    {
      path: 'trainers',
      component: TrainersComponent,
    },
    {
      path: 'trainers/form',
      component: TrainersFormComponent,
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
];
