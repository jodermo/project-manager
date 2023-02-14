import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesDatabaseTableComponent } from './companies-database-table.component';

describe('CompaniesDatabaseTableComponent', () => {
  let component: CompaniesDatabaseTableComponent;
  let fixture: ComponentFixture<CompaniesDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesDatabaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
