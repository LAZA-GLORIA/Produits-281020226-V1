import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AxyusFormRoutingModule } from './axyus-form-routing.module';
import { AxyusFormComponent } from './components/axyus-form/axyus-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AxyusFormComponent],
  imports: [CommonModule, AxyusFormRoutingModule, SharedModule],
})
export class AxyusFormModule {}
