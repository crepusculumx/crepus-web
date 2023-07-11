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
} from 'rxjs';

// Blocked a frame with origin “xxx“ from accessing a cross-origin frame
// script in iframe
// function sendMessage() {
//   const height = document.body.clientHeight;
//   window.parent.postMessage(
//     {
//       height: height,
//     },
//     '*'
//   );
// }
// window.addEventListener('resize', function () {
//   sendMessage();
// });
//
// window.addEventListener('load', function () {
//   sendMessage();
// });
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

  private destroy$ = new AsyncSubject<boolean>();

  public height$ = new ReplaySubject<number>(1);

  private startHeight() {
    this.iframeUrl$
      .pipe(
        switchMap(() => {
          return fromEvent(window, 'message').pipe(
            map((message): number => {
              return (message as IframeMsg).data.height;
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
    this.startHeight();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
