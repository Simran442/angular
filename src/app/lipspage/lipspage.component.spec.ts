import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LipspageComponent } from './lipspage.component';

describe('LipspageComponent', () => {
  let component: LipspageComponent;
  let fixture: ComponentFixture<LipspageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LipspageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LipspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
