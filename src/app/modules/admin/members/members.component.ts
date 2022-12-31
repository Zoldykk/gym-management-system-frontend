import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MembersDialogComponent } from './components/members-dialog/members-dialog.component';
import { Member } from './models/Member';
import { MemberService } from './services/member.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],

})
export class MembersComponent implements OnInit {
  members: Member[]
  displayedColumns: string[] = ['member', 'age', 'email', 'phoneNumber', 'startDate', 'endDate', 'plan',];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog, private memberService: MemberService) { }
  ngOnInit(): void {

    this.memberService.refreshParentComponentState.subscribe(refreshParent => {
      if (refreshParent) {
        this.getMembers()
      }
    })
    this.getMembers()
  }

  openDialog() {
    const dialogRef = this.dialog.open(MembersDialogComponent, {
      width: '20%',
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  onAddMember() {
    this.memberService.saveDialogConfiguration({
      title: "Add Member",
      mode: 'create',
      btnText: 'Add'
    })
    this.openDialog()
  }

  onFilter() {
    this.memberService.saveDialogConfiguration({
      title: "Filter Members",
      mode: 'filter',
      btnText: 'Apply'
    })
    this.openDialog()
  }

  onEditMember(member: Member) {
    this.memberService.saveDialogConfiguration({
      title: "Edit Member",
      mode: 'create',
      btnText: 'Save',
      member: member
    })
    this.openDialog()
  }

  getMembers() {
    this.memberService.getAllMembers().subscribe(res => {
      this.members = res
    })
  }


}
