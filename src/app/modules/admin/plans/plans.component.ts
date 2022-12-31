import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlansDialogComponent } from './components/plans-dialog/plans-dialog.component';
import { Plan } from './models/Plan';
import { PlanService } from './services/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  displayedColumns: string[] = ['title', 'durationInDays', 'status'];

  plans: Plan[]
  constructor(private planService: PlanService, public dialog: MatDialog,) { }
  ngOnInit(): void {
    this.getAllPlans()

    this.planService.refreshParentComponentState.subscribe(refreshParent => {
      if (refreshParent) {
        this.getAllPlans()
      }
    })
  }

  onAddPlan() {
    this.planService.saveDialogConfiguration({
      title: "Add Plan",
      mode: 'create',
      btnText: 'Add'
    })
    this.openDialog()
  }
  onEditPlan(plan: Plan) {
    this.planService.saveDialogConfiguration({
      title: "Edit Plan",
      mode: 'create',
      btnText: 'Add',
      plan: plan
    })
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(PlansDialogComponent, {
      width: '20%',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllPlans() {
    this.planService.getAllPlans().subscribe(res => {
      this.plans = res
    })
  }

}
