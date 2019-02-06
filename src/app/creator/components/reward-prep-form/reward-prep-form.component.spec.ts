import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPrepFormComponent } from './reward-prep-form.component';

describe('RewardPrepFormComponent', () => {
  let component: RewardPrepFormComponent;
  let fixture: ComponentFixture<RewardPrepFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardPrepFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPrepFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
