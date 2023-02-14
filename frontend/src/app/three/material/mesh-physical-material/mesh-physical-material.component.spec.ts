import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshPhysicalMaterialComponent } from './mesh-physical-material.component';

describe('MeshPhysicalMaterialComponent', () => {
  let component: MeshPhysicalMaterialComponent;
  let fixture: ComponentFixture<MeshPhysicalMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeshPhysicalMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeshPhysicalMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
