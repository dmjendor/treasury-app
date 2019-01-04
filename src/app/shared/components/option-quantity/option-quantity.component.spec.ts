import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionQuantityComponent } from './option-quantity.component';

describe('OptionQuantityComponent', () => {
  let component: OptionQuantityComponent;
  let fixture: ComponentFixture<OptionQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
