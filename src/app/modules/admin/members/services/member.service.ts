import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'app/core/http/http-handler.service';
import { BehaviorSubject } from 'rxjs';
import { DialogConfiguration } from '../models/DialogConfiguration';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private dialogConfigurationSource = new BehaviorSubject<any>('');
  dialogConfiguration = this.dialogConfigurationSource.asObservable();

  private refreshParentComponentStateSource = new BehaviorSubject<boolean>(false);
  refreshParentComponentState = this.refreshParentComponentStateSource.asObservable();

  constructor(private http: HttpHandlerService) { }


  saveDialogConfiguration(configuration: DialogConfiguration) {
    this.dialogConfigurationSource.next(configuration)
  }

  saveRefereshParentComponentState(state) {
    this.refreshParentComponentStateSource.next(state);
  }

  getAllPlans() {
    return this.http.get("/plans")
  }

  getAllMembers() {
    return this.http.get("/members")
  }

  registerMember(member: Member) {
    return this.http.post("/member/create", member)

  }


}
