import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlDocComponent } from './html-doc.component';

describe('HtmlDocComponent', () => {
  let component: HtmlDocComponent;
  let fixture: ComponentFixture<HtmlDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtmlDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HtmlDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
