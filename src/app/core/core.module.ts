import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderLateralComponent } from './header-lateral/header-lateral.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    HeaderLateralComponent
  ],
  imports: [
    CommonModule, SharedModule, RouterModule, HttpClientModule
  ],
  exports: [
    HeaderComponent,
    HeaderLateralComponent
  ]
})
export class CoreModule { }
