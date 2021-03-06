import { NgModule } from '@angular/core';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbTreeGridModule, 
  NbButtonModule,
  NbRadioModule,
  NbSelectModule,
  NbCheckboxModule,
  NbDialogModule,
  NbActionsModule,
  NbDatepickerModule,
  NbSpinnerModule,
  NbLayoutModule,


} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';

import { ManagementRoutingModule, routedComponents } from './management-routing.module';
import {ClassesService} from './classes/classes.service';

import {TrainersService} from '../administration/trainers/trainers.service';
import { ExcelService } from './class-list/excel.service';

//Models
import {AthletesModel} from './athletes/athletes.model';
import {ClassesModel} from './classes/classes.model';
//Services
import {AthletesService} from './athletes/athletes.service';
import {RequestsService} from './requests/requests.service';
import {CommissionsService} from '../administration/commissions/commissions.service';

//Models


@NgModule({
  imports: [
    ManagementRoutingModule,  
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    NbRadioModule,
    NbButtonModule,
    NbSelectModule,
    NbActionsModule,
    NbDatepickerModule,
    NbDialogModule,
    ThemeModule,
    FormsModule,
    Ng2SmartTableModule,
    NbSpinnerModule,
    NbLayoutModule,

  ],
  

  declarations: [
    ...routedComponents,
  ],
  providers: [
    AthletesModel,
    ClassesService,
    ClassesModel,
    TrainersService,
    AthletesService,
    RequestsService,
    ExcelService,
    CommissionsService,
  ],
})
export class ManagementModule { }
