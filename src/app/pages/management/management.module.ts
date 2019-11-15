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

import {ClassesService} from './classes/classes.service';
import {TrainersService} from '../administration/trainers/trainers.service';

//Models
import {AthletesModel} from './athletes/athletes.model';
import {ClassesModel} from './classes/classes.model';

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
    ClassesService,
    ClassesModel,
    TrainersService,
  ],
})
export class ManagementModule { }
