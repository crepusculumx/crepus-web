import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinImgComponent } from './spin-img.component';

describe('SpinImgComponent', () => {
  let component: SpinImgComponent;
  let fixture: ComponentFixture<SpinImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinImgComponent],
    });
    fixture = TestBed.createComponent(SpinImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
