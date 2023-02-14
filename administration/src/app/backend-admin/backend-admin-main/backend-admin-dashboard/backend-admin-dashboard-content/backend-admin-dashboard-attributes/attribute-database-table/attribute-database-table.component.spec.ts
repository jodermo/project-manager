import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeDatabaseTableComponent } from './attribute-database-table.component';

describe('AttributeDatabaseTableComponent', () => {
  let component: AttributeDatabaseTableComponent;
  let fixture: ComponentFixture<AttributeDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeDatabaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
