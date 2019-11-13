import { NgModule } from '@angular/core';

import { ManagementRoutingModule, routedComponents } from './management-routing.module';

@NgModule({
  imports: [
      ManagementRoutingModule
  ],

  declarations: [
    ...routedComponents,
  ],
  providers: [

  ],
})
export class ManagementModule { }
