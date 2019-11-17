import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmakeupComponent } from './allmakeup.component';

describe('AllmakeupComponent', () => {
  let component: AllmakeupComponent;
  let fixture: ComponentFixture<AllmakeupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllmakeupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmakeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
