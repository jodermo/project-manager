import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoOverviewComponent } from './memo-overview.component';

describe('MemoOverviewComponent', () => {
  let component: MemoOverviewComponent;
  let fixture: ComponentFixture<MemoOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
