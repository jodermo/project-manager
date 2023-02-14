import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDataComponent } from './json-data.component';

describe('JsonDataComponent', () => {
  let component: JsonDataComponent;
  let fixture: ComponentFixture<JsonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
