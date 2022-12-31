import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { SharedModule } from 'app/shared/shared.module';
import { MembersComponent } from './members.component';
import { MembersDialogComponent } from './components/members-dialog/members-dialog.component';

const membersRoutes: Route[] = [
  {
    path: '',
    component: MembersComponent
  }
];

@NgModule({
  declarations: [
    MembersComponent,
    MembersDialogComponent
  ],
  imports: [
    RouterModule.forChild(membersRoutes),
    SharedModule
  ]
})
export class MembersModule {
}
