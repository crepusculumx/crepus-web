import { Component, Input } from '@angular/core';
import { filter, fromEvent, map, startWith } from 'rxjs';
import { NgStyle } from '@angular/common';
import { SafeUrlPipe } from '../../../../../../../pipes/safe-url.pipe';
import { toSignal } from '@angular/core/rxjs-interop';

interface IframeMsg extends Event {
  data?: { height?: number };
}

@Component({
  selector: 'app-full-iframe',
  standalone: true,
  imports: [NgStyle, SafeUrlPipe],
  templateUrl: './full-iframe.component.html',
  styleUrl: './full-iframe.component.less',
})
export class FullIframeComponent {
  @Input({ required: true }) public iframeUrl!: string;

  /**
   * 如果切换iframe的url，会导致浏览器将切换记录保存到历史记录，使后退键错乱（从后退路由改为后退iframe url）。
   * 因此当iframeUrl变化时，创建新的iframe。
   */

  private height$ = fromEvent(window, 'message').pipe(
    filter((message): message is IframeMsg => {
      // 可能是收到别的东西发的message了，这里只能先过滤一下，以后增加唯一标识确保受到的是iframe发来的消息
      return (
        (message as IframeMsg).data !== undefined &&
        (message as IframeMsg).data?.height !== undefined
      );
    }),
    map((message): number => {
      // magic number. 一些情况下，iframe html高度大于iframe内返回的document.body.clientHeight
      return (message as IframeMsg).data!.height! + 100;
    }),
    startWith(document.body.clientHeight * 0.7),
  );
  public height = toSignal(this.height$);
}
