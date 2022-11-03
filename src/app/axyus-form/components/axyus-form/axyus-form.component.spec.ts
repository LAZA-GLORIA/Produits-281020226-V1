import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxyusFormComponent } from './axyus-form.component';

describe('AxyusFormComponent', () => {
  let component: AxyusFormComponent;
  let fixture: ComponentFixture<AxyusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxyusFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxyusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
