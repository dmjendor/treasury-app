import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrepCoinComponent } from './edit-prep-coin.component';

describe('EditPrepCoinComponent', () => {
  let component: EditPrepCoinComponent;
  let fixture: ComponentFixture<EditPrepCoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrepCoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrepCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
