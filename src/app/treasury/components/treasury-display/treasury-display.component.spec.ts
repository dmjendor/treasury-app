import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasuryDisplayComponent } from './treasury-display.component';

describe('TreasuryDisplayComponent', () => {
  let component: TreasuryDisplayComponent;
  let fixture: ComponentFixture<TreasuryDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasuryDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasuryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
