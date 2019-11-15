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
  NbDatepickerModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from '../../@theme/theme.module';

import { ManagementRoutingModule, routedComponents } from './management-routing.module';
import {ClassesService} from './classes/classes.service';

//Services
import {AthletesService} from './athletes/athletes.service';
import {RequestsService} from './requests/requests.service';

//Models
import {AthletesModel} from './athletes/athletes.model';


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
  ],
  

  declarations: [
    ...routedComponents,
  ],
  providers: [
    AthletesModel,
    ClassesService,
    AthletesService,
    RequestsService,

  ],
})
export class ManagementModule { }
