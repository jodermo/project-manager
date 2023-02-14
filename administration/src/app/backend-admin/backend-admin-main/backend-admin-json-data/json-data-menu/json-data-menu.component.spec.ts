import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDataMenuComponent } from './json-data-menu.component';

describe('JsonDataMenuComponent', () => {
  let component: JsonDataMenuComponent;
  let fixture: ComponentFixture<JsonDataMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonDataMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonDataMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
