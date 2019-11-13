import { NgModule } from '@angular/core';

import { AdministrationRoutingModule, routedComponents } from './administration-routing.module';

@NgModule({
  imports: [
      AdministrationRoutingModule
  ],

  declarations: [
    ...routedComponents,
  ],
  providers: [

  ],
})
export class AdministrationModule { }
