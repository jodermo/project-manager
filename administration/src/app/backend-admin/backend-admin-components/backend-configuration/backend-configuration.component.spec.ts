import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendConfigurationComponent } from './backend-configuration.component';

describe('BackendConfigurationComponent', () => {
  let component: BackendConfigurationComponent;
  let fixture: ComponentFixture<BackendConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
