import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagsModalFormComponent } from './bags-modal-form.component';

describe('BagsModalFormComponent', () => {
  let component: BagsModalFormComponent;
  let fixture: ComponentFixture<BagsModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagsModalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagsModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
