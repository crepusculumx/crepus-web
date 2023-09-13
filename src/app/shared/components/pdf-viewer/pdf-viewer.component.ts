import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, takeUntil, timer } from 'rxjs';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.less'],
})
export class PdfViewerComponent extends BaseComponent implements OnInit {
  @Input() pdfUrl$!: Observable<string>;

  public curPdfUrl$ = new BehaviorSubject<string | null>(null);

  constructor() {
    super();
  }
  private startCurPdfUrl() {
    this.pdfUrl$.pipe(takeUntil(this.destroy$)).subscribe((url) => {
      this.curPdfUrl$.next(null);
      timer(0)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.curPdfUrl$.next(url);
        });
    });
  }

  ngOnInit(): void {
    this.startCurPdfUrl();
    this.curPdfUrl$.subscribe((x) => {
      console.log(x);
    });
  }
}
