import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPrepCoinComponent } from './display-prep-coin.component';

describe('DisplayPrepCoinComponent', () => {
  let component: DisplayPrepCoinComponent;
  let fixture: ComponentFixture<DisplayPrepCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPrepCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPrepCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
