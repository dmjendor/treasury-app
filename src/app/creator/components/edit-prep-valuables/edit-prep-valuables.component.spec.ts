import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrepValuablesComponent } from './edit-prep-valuables.component';

describe('EditPrepValuablesComponent', () => {
  let component: EditPrepValuablesComponent;
  let fixture: ComponentFixture<EditPrepValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrepValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrepValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
