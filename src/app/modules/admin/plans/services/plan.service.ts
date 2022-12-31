import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'app/core/http/http-handler.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Plan } from '../models/Plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private dialogConfigurationSource = new BehaviorSubject<any>('');
  dialogConfiguration = this.dialogConfigurationSource.asObservable();

  private refreshParentComponentStateSource = new BehaviorSubject<boolean>(false);
  refreshParentComponentState = this.refreshParentComponentStateSource.asObservable();



  constructor(private http: HttpHandlerService) { }


  saveDialogConfiguration(configuration) {
    this.dialogConfigurationSource.next(configuration)
  }

  saveRefereshParentComponentState(state) {
    this.refreshParentComponentStateSource.next(state);
  }


  onRegisterPlan(plan: Plan) {
    return this.http.post("/plan/create", plan)
  }

  getAllPlans() {
    return this.http.get("/plans")
  }





}
