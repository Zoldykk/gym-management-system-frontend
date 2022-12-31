import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansDialogComponent } from './plans-dialog.component';

describe('PlansDialogComponent', () => {
  let component: PlansDialogComponent;
  let fixture: ComponentFixture<PlansDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
