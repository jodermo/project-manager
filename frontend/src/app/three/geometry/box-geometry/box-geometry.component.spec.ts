import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxGeometryComponent } from './box-geometry.component';

describe('BoxGeometryComponent', () => {
  let component: BoxGeometryComponent;
  let fixture: ComponentFixture<BoxGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxGeometryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
