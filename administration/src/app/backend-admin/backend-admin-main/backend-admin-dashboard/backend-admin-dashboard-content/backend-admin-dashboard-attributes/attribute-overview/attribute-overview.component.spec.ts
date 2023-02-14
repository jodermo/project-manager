import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeOverviewComponent } from './attribute-overview.component';

describe('AttributeOverviewComponent', () => {
  let component: AttributeOverviewComponent;
  let fixture: ComponentFixture<AttributeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
