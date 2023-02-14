import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiDatabaseTableComponent } from './poi-database-table.component';

describe('PoiDatabaseTableComponent', () => {
  let component: PoiDatabaseTableComponent;
  let fixture: ComponentFixture<PoiDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoiDatabaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
