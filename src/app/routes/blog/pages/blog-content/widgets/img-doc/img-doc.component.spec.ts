import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgDocComponent } from './img-doc.component';

describe('ImgDocComponent', () => {
  let component: ImgDocComponent;
  let fixture: ComponentFixture<ImgDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImgDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
