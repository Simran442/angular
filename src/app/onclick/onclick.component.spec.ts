import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnclickComponent } from './onclick.component';

describe('OnclickComponent', () => {
  let component: OnclickComponent;
  let fixture: ComponentFixture<OnclickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnclickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
