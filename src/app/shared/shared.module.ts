import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from '../core/components/home/home.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, MaterialModule,
  ],
  exports: [
    MaterialModule, 
  ]
})
export class SharedModule { }
