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

<<<<<<< HEAD
import {ClassesService} from './classes/classes.service';
import {TrainersService} from '../administration/trainers/trainers.service';

//Models
import {AthletesModel} from './athletes/athletes.model';
import {ClassesModel} from './classes/classes.model';
=======
//Services
import {AthletesService} from './athletes/athletes.service';

//Models
import {AthletesModel} from './athletes/athletes.model';

>>>>>>> 6c0d46d453785905e32809e49c034275d5efeebb

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
<<<<<<< HEAD
    ClassesService,
    ClassesModel,
    TrainersService,
=======
    AthletesService,
>>>>>>> 6c0d46d453785905e32809e49c034275d5efeebb
  ],
})
export class ManagementModule { }
