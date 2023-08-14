import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AsyncSubject,
  fromEvent,
  map,
  Observable,
  ReplaySubject,
  startWith,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';

// Blocked a frame with origin “xxx“ from accessing a cross-origin frame
// script in iframe
// <script>
//   function sendMessage() {
//     const height = document.body.clientHeight;
//     window.parent.postMessage(
//       {
//         height: height,
//       },
//       "*"
//     );
//   }
// window.addEventListener("resize", function () {
//   sendMessage();
// });
//
// window.addEventListener("load", function () {
//   sendMessage();
// });
// </script>
interface IframeMsg extends Event {
  data: { height: number };
}

@Component({
  selector: 'app-full-iframe',
  templateUrl: './full-iframe.component.html',
  styleUrls: ['./full-iframe.component.less'],
})
export class FullIframeComponent implements OnInit, OnDestroy {
  @Input()
  public iframeUrl$!: Observable<string>;

  public curIframeUrl$ = new ReplaySubject<string | null>();

  /**
   * 如果切换iframe的url，会导致浏览器将切换记录保存到历史记录，使后退键错乱（从后退路由改为后退iframe url）。
   * 因此当iframeUrl变化时，创建新的iframe。
   * @private
   */
  private startCurIframeUrl() {
    this.iframeUrl$.pipe(takeUntil(this.destroy$)).subscribe((url) => {
      this.curIframeUrl$.next(null);
      timer(0)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.curIframeUrl$.next(url);
        });
    });
  }

  private destroy$ = new AsyncSubject<boolean>();

  public height$ = new ReplaySubject<number>(1);

  private startHeight() {
    this.iframeUrl$
      .pipe(
        switchMap(() => {
          return fromEvent(window, 'message').pipe(
            map((message): number => {
              // magic number. 一些情况下，iframe html高度大于iframe内返回的document.body.clientHeight
              return (message as IframeMsg).data.height + 100;
            }),
            startWith(document.body.clientHeight * 0.7) // default height
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((height) => {
        this.height$.next(height);
      });
  }
  ngOnInit() {
    this.startCurIframeUrl();
    this.startHeight();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
