import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { CatalogRoutingModule, routedComponents } from './catalog-routing.module';
import { ToasterService, ToasterConfig, Toast, BodyOutputType, ToasterModule } from 'angular2-toaster';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    CatalogRoutingModule,
    Ng2SmartTableModule,
    ToasterModule,
    FormsModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ToasterService,
    NgbModal,
  ]
})
export class CatalogModule { }
