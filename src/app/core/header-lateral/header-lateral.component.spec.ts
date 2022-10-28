import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLateralComponent } from './header-lateral.component';

describe('HeaderLateralComponent', () => {
  let component: HeaderLateralComponent;
  let fixture: ComponentFixture<HeaderLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderLateralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
