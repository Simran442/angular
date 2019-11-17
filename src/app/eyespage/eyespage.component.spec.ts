import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyespageComponent } from './eyespage.component';

describe('EyespageComponent', () => {
  let component: EyespageComponent;
  let fixture: ComponentFixture<EyespageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyespageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
