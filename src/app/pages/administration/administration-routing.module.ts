import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { AdministrationComponent } from './administration.component';
import {CommissionsComponent} from './commissions/commissions.component';
import {CommissionsFormComponent} from './commissions-form/commissions-form.component';


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
];
