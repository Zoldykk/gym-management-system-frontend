import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from 'app/modules/admin/plans/models/Plan';
import { DialogConfiguration } from '../../models/DialogConfiguration';
import { Member } from '../../models/Member';
import { MemberService } from '../../services/member.service';



@Component({
  selector: 'app-members-dialog',
  templateUrl: './members-dialog.component.html',
  styleUrls: ['./members-dialog.component.scss']
})
export class MembersDialogComponent implements OnInit {
  config: DialogConfiguration
  memberForm: FormGroup
  filterForm: FormGroup
  foods: any = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];


  plans: Plan[]


  constructor(private fb: FormBuilder, private memberService: MemberService, public dialog: MatDialog,) { }
  ngOnInit(): void {
    this.memberService.dialogConfiguration.subscribe((config: DialogConfiguration) => {
      this.config = config

      if (config.mode === 'create') {
        this.initMembersForm()
      }
      if (config.mode === 'filter') {
        this.initFilterForm()
      }

      if (config?.member) {
        this.initMembersForm(config?.member)
      }
    })

    this.getAllPlans()

  }

  initMembersForm(member?) {
    this.memberForm = this.fb.group({
      fullName: [member ? member?.fullName : null, Validators.required],
      age: [member ? member?.age : null, Validators.required],
      email: [member ? member?.email : null, Validators.required],
      phoneNumber: [member ? member?.phoneNumber : null, Validators.required],
      plan: [member ? member?.plan : null, Validators.required],
      // profilePciture: [null, Validators.required],
    })

  }
  initFilterForm() {
    this.filterForm = this.fb.group({
      plan: [null],
      startDate: [null],
      endDate: [null],
    })
  }

  getAllPlans() {
    this.memberService.getAllPlans().subscribe(res => {
      this.plans = res
    })
  }

  onRegisterMember() {
    if (this.memberForm.valid) {
      this.memberService.registerMember(this.memberForm.value).subscribe(res => {
        this.resetState()
      })
    }
  }

  onDialogSave() {
    if (this.config.mode === 'create') {
      this.onRegisterMember()
    }
    if (this.config.mode === 'filter') {

    }
  }

  resetState() {
    this.memberForm.reset()
    this.dialog.closeAll()
    this.memberService.saveRefereshParentComponentState(true)
  }


}
