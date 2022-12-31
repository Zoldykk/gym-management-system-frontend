import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { PlansDialogComponent } from './components/plans-dialog/plans-dialog.component';
import { SharedModule } from 'app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';


const plansRoutes: Route[] = [
  {
    path: '',
    component: PlansComponent
  }
];

@NgModule({
  declarations: [
    PlansComponent,
    PlansDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(plansRoutes),

  ]
})
export class PlansModule { }
