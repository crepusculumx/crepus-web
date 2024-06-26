import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogWelcomeComponent } from './blog-welcome.component';

describe('BlogWelcomeComponent', () => {
  let component: BlogWelcomeComponent;
  let fixture: ComponentFixture<BlogWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogWelcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
