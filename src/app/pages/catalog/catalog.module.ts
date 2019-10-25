import { NgModule } from '@angular/core';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbTreeGridModule, 
  NbSelectModule,
  NbActionsModule,
  NbButtonModule,

  NbRadioModule,
  NbUserModule,} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { CatalogRoutingModule, routedComponents } from './catalog-routing.module';
import { FormsModule } from '@angular/forms';
import {UsersService} from './users/users.service';
import {TrainersService} from './trainers/trainers.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DisciplinesService} from './disciplines/disciplines.service';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    CatalogRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    NgbModule,
    NbSelectModule,
    NbActionsModule,
    NbButtonModule,
    NbRadioModule,
    NbUserModule,

  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    UsersService,
    TrainersService,
    DisciplinesService
  ],
})
export class CatalogModule { }
