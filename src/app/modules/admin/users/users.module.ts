import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';

const usersRoute: Route[] = [
  {
    path: "",
    component: UsersComponent
  }
]

@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
    UsersDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoute),
    SharedModule
  ]
})
export class UsersModule { }
