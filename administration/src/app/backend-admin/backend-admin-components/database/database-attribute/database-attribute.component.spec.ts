import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseAttributeComponent } from './database-attribute.component';

describe('DatabaseAttributeComponent', () => {
  let component: DatabaseAttributeComponent;
  let fixture: ComponentFixture<DatabaseAttributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseAttributeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
