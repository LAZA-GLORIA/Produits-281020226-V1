import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // => localhost:4200
  { path: 'home', component: HomeComponent }, // => localhost:4200/home
  {
    path: 'complex-form',
    loadChildren: () =>
      import('./complex-form/complex-form.module').then(
        (m) => m.ComplexFormModule
      ),
  },
  {
    path: 'axyus-form',
    loadChildren: () =>
      import('./axyus-form/axyus-form.module').then(
        (m) => m.AxyusFormModule
      ),
  },
  {
    path: 'reactive-state',
    loadChildren: () =>
      import('./reactive-state/reactive-state.module').then(
        (m) => m.ReactiveStateModule
      ),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
