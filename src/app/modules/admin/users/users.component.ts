import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(public dialog: MatDialog, private usersService: UserService) { }


  ngOnInit(): void {
    this.getUsers()
    this.usersService.refreshParentComponentState.subscribe(refreshParent => {
      if (refreshParent) {
        this.getUsers()
      }
    })
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(res => {
      this.users = res
    })
  }


  openDialog() {
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: '20%',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onAddUser() {
    this.usersService.saveDialogConfiguration({
      title: "Add User",
      mode: 'create',
      btnText: 'Add'
    })
    this.openDialog()
  }

  onFilter() {
    this.usersService.saveDialogConfiguration({
      title: "Filter users",
      mode: 'filter',
      btnText: 'Apply'
    })
    this.openDialog()
  }

}
