import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacepageComponent } from './facepage.component';

describe('FacepageComponent', () => {
  let component: FacepageComponent;
  let fixture: ComponentFixture<FacepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
