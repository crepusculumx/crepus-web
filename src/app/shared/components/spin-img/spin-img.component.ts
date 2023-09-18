import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, takeUntil, timer } from 'rxjs';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-spin-img',
  templateUrl: './spin-img.component.html',
  styleUrls: ['./spin-img.component.less'],
})
export class SpinImgComponent extends BaseComponent implements OnInit {
  @Input() imgUrl$!: Observable<string>;

  constructor() {
    super();
  }

  public spinning$ = new BehaviorSubject<boolean>(true);

  public curImgUrl$ = new BehaviorSubject<string | null>(null);

  startCurImgUrl() {
    this.imgUrl$.subscribe((imgUrl) => {
      this.curImgUrl$.next(null);
      this.spinning$.next(true);
      timer(0)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.curImgUrl$.next(imgUrl);
        });
    });
  }
  ngOnInit() {
    this.startCurImgUrl();
    return;
  }
}
