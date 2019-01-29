import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBagsComponent } from './manage-bags.component';

describe('ManageBagsComponent', () => {
  let component: ManageBagsComponent;
  let fixture: ComponentFixture<ManageBagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
