import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesDatabaseTableComponent } from './files-database-table.component';

describe('FilesDatabaseTableComponent', () => {
  let component: FilesDatabaseTableComponent;
  let fixture: ComponentFixture<FilesDatabaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesDatabaseTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
