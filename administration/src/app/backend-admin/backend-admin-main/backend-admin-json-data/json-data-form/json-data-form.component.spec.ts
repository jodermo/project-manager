import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDataFormComponent } from './json-data-form.component';

describe('JsonDataFormComponent', () => {
  let component: JsonDataFormComponent;
  let fixture: ComponentFixture<JsonDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
