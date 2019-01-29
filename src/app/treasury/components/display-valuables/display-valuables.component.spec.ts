import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayValuablesComponent } from './display-valuables.component';

describe('DisplayValuablesComponent', () => {
  let component: DisplayValuablesComponent;
  let fixture: ComponentFixture<DisplayValuablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayValuablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayValuablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
