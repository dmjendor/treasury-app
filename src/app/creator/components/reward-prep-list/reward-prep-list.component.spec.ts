import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardPrepListComponent } from './reward-prep-list.component';

describe('RewardPrepListComponent', () => {
  let component: RewardPrepListComponent;
  let fixture: ComponentFixture<RewardPrepListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardPrepListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardPrepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
