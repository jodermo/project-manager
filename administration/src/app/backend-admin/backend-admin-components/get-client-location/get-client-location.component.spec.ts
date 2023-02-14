import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClientLocationComponent } from './get-client-location.component';

describe('GetClientLocationComponent', () => {
  let component: GetClientLocationComponent;
  let fixture: ComponentFixture<GetClientLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetClientLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetClientLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
