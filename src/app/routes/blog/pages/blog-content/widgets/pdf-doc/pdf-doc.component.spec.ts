import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDocComponent } from './pdf-doc.component';

describe('PdfDocComponent', () => {
  let component: PdfDocComponent;
  let fixture: ComponentFixture<PdfDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PdfDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
