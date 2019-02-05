import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagsModalViewComponent } from './bags-modal-view.component';

describe('BagsModalViewComponent', () => {
  let component: BagsModalViewComponent;
  let fixture: ComponentFixture<BagsModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagsModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagsModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
