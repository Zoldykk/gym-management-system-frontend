import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from '../../models/Plan';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plans-dialog',
  templateUrl: './plans-dialog.component.html',
  styleUrls: ['./plans-dialog.component.scss']
})
export class PlansDialogComponent implements OnInit {
  planForm: FormGroup
  config: any
  constructor(private fb: FormBuilder, private planService: PlanService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.planService.dialogConfiguration.subscribe(config => {
      this.config = config
      if (config?.plan) {
        this.initPlanForm(config?.plan)
      } else {
        this.initPlanForm()
      }
    })
  }

  initPlanForm(plan?) {
    this.planForm = this.fb.group({
      title: [plan ? plan?.title : null, Validators.required],
      isActive: [plan ? plan?.isActive : false, Validators.required],
      durationInDays: [plan ? plan?.durationInDays : null, Validators.required],
    })
  }


  onRegisterPlan() {
    if (this.planForm.valid) {
      this.planService.onRegisterPlan(this.planForm.value).subscribe(res => {
        this.resetState()
      }, err => {
        console.log(err);

      })
    }
  }


  resetState() {
    this.planService.saveRefereshParentComponentState(true)
    this.dialog.closeAll()
    this.planForm.reset()
  }









}
