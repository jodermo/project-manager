import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTemplateOverviewComponent } from './project-template-overview.component';

describe('ProjectTemplateOverviewComponent', () => {
  let component: ProjectTemplateOverviewComponent;
  let fixture: ComponentFixture<ProjectTemplateOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTemplateOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTemplateOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
