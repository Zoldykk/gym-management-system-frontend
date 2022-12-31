import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent implements OnInit {
  userForm: FormGroup
  config: any
  roles: any;
  selectedRoles: any = []
  constructor(private fb: FormBuilder, private userService: UserService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getAllRoles()

    this.userService.dialogConfiguration.subscribe(config => {
      this.config = config
      if (this.config?.mode === 'create') {
        this.initUserForm()
      }
    })

  }


  getAllRoles() {
    this.userService.getAllRoles().subscribe(res => {
      this.roles = res
    })
  }

  initUserForm(user?: User) {
    this.userForm = this.fb.group({
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      password: [null, Validators.required],
      passwordConfirmation: [null, Validators.required],
    })
  }


  onDialogSave() {
    if (this.config.mode === 'create') {
      this.onRegisterUser()
    }
    if (this.config.mode === 'filter') {

    }
  }


  onRegisterUser() {
    if (this.userForm.valid) {
      delete this.userForm.value.passwordConfirmation
      this.userService.registerUser({ ...this.userForm.value, roles: this.selectedRoles.map(item => item.title) }).subscribe(res => {
        this.resetState()
      })
    }
  }

  resetState() {
    this.userForm.reset()
    this.selectedRoles = []
    this.dialog.closeAll()
    this.userService.saveRefereshParentComponentState(true)
  }
}
