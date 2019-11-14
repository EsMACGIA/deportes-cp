import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';

import { ManagementRoutingModule, routedComponents } from './management-routing.module';

@NgModule({
  imports: [
    ManagementRoutingModule,  
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
  ],

  declarations: [
    ...routedComponents,
  ],
  providers: [

  ],
})
export class ManagementModule { }
