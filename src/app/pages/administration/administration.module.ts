import { NgModule } from '@angular/core';

import { AdministrationRoutingModule, routedComponents } from './administration-routing.module';

import {
  NbCardModule,
  NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
//Services
import {CommissionsService} from './commissions/commissions.service';
import {TrainersService} from './trainers/trainers.service';
//Models
import {CommissionsModel} from './commissions/commissions.model';
import {TrainersModel} from './trainers/trainers.model';

@NgModule({
  imports: [
      AdministrationRoutingModule,
      NbCardModule,
      Ng2SmartTableModule,
      NbActionsModule,
      NbButtonModule,
      NbCheckboxModule,
      NbDatepickerModule, NbIconModule,
      NbInputModule,
      NbRadioModule,
      NbSelectModule,
      FormsModule,
      CommonModule
  ],

  declarations: [
    ...routedComponents,
  ],
  providers: [
    CommissionsService,
    CommissionsModel,
    TrainersService,
    TrainersModel,
  ],
})
export class AdministrationModule { }
