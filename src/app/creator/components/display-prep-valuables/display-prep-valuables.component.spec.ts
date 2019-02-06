import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPrepValuablesComponent } from './display-prep-valuables.component';

describe('DisplayPrepValuablesComponent', () => {
  let component: DisplayPrepValuablesComponent;
  let fixture: ComponentFixture<DisplayPrepValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPrepValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPrepValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
