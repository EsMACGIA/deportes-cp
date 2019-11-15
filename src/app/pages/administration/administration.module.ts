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
  NbDialogModule,

} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

//Services
import {CommissionsService} from './commissions/commissions.service';
//Models
import {CommissionsModel} from './commissions/commissions.model';
import { CommonModule } from '@angular/common';  
import { NbDialogService} from '@nebular/theme'

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
      CommonModule,
      NbDialogModule,

      
  ],
  declarations: [
    ...routedComponents,

  ],
  
  providers: [
    CommissionsService,
    CommissionsModel,
  ],
})
export class AdministrationModule { }
