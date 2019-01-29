import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValuablesComponent } from './edit-valuables.component';

describe('EditValuablesComponent', () => {
  let component: EditValuablesComponent;
  let fixture: ComponentFixture<EditValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
