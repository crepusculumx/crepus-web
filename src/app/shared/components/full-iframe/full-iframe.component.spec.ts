import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullIframeComponent } from './full-iframe.component';

describe('FullIframeComponent', () => {
  let component: FullIframeComponent;
  let fixture: ComponentFixture<FullIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
