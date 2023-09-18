import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedRepComponent } from './med-rep.component';

describe('MedRepComponent', () => {
  let component: MedRepComponent;
  let fixture: ComponentFixture<MedRepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedRepComponent]
    });
    fixture = TestBed.createComponent(MedRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
