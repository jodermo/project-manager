import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendSettingsComponent } from './backend-settings.component';

describe('BackendSettingsComponent', () => {
  let component: BackendSettingsComponent;
  let fixture: ComponentFixture<BackendSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
