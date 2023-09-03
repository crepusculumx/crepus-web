import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  takeUntil,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-spin-img',
  templateUrl: './spin-img.component.html',
  styleUrls: ['./spin-img.component.less'],
})
export class SpinImgComponent implements OnInit, OnDestroy {
  @Input() imgUrl$!: Observable<string>;

  private destroy$ = new AsyncSubject<boolean>();
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

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
