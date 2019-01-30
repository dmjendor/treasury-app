import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuablesFormComponent } from './valuables-form.component';

describe('ValuablesFormComponent', () => {
  let component: ValuablesFormComponent;
  let fixture: ComponentFixture<ValuablesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuablesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
