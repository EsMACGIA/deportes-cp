import { NgModule } from '@angular/core';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbTreeGridModule, 
  NbButtonModule,
  NbSelectModule,
  NbDatepickerModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';

import { ManagementRoutingModule, routedComponents } from './management-routing.module';

//Models
import {AthletesModel} from './athletes/athletes.model';
@NgModule({
  imports: [
    ManagementRoutingModule,  
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbDatepickerModule,
    ThemeModule,
    FormsModule,
    Ng2SmartTableModule,
  ],

  declarations: [
    ...routedComponents,
  ],
  providers: [
    AthletesModel,
  ],
})
export class ManagementModule { }
