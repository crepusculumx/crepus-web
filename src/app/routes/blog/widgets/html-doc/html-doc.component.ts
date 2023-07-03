import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-html-doc',
  templateUrl: './html-doc.component.html',
  styleUrls: ['./html-doc.component.less'],
})
export class HtmlDocComponent implements AfterViewInit {
  @ViewChild('ifr', { static: true }) ifr!: ElementRef;

  public height$ = new BehaviorSubject<number>(0);

  ngAfterViewInit(): void {
    const iframeElement = this.ifr.nativeElement;

    iframeElement.onload = () => {
      if (iframeElement.contentDocument?.body.scrollHeight != null) {
        this.height$.next(
          iframeElement.contentDocument?.body.scrollHeight + 10
        );
      }
    };
  }
}
