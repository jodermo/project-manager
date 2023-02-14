import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageConfigComponent } from './language-config.component';

describe('LanguageConfigComponent', () => {
  let component: LanguageConfigComponent;
  let fixture: ComponentFixture<LanguageConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
