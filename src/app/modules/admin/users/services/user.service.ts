import { Injectable } from '@angular/core';
import { HttpHandlerService } from 'app/core/http/http-handler.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private dialogConfigurationSource = new BehaviorSubject<any>('');
  dialogConfiguration = this.dialogConfigurationSource.asObservable();


  private refreshParentComponentStateSource = new BehaviorSubject<boolean>(false);
  refreshParentComponentState = this.refreshParentComponentStateSource.asObservable();
  constructor(private http: HttpHandlerService) { }


  saveDialogConfiguration(configuration: any) {
    this.dialogConfigurationSource.next(configuration)
  }

  saveRefereshParentComponentState(state) {
    this.refreshParentComponentStateSource.next(state);
  }


  getAllRoles() {
    return this.http.get("/roles")
  }

  getAllUsers() {
    return this.http.get("/users")
  }

  registerUser(user: User) {
    return this.http.post("/user/create", user)

  }

}
