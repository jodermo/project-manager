import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoDatabaseTableComponent } from './memo-database-table.component';

describe('MemoDatabaseTableComponent', () => {
  let component: MemoDatabaseTableComponent;
  let fixture: ComponentFixture<MemoDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoDatabaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
