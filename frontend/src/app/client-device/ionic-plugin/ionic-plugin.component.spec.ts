import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicPluginComponent } from './ionic-plugin.component';

describe('IonicPluginComponent', () => {
  let component: IonicPluginComponent;
  let fixture: ComponentFixture<IonicPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IonicPluginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
