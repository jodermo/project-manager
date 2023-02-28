import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTemplateDatabaseTableComponent } from './project-template-database-table.component';

describe('ProjectTemplateDatabaseTableComponent', () => {
  let component: ProjectTemplateDatabaseTableComponent;
  let fixture: ComponentFixture<ProjectTemplateDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTemplateDatabaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTemplateDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
