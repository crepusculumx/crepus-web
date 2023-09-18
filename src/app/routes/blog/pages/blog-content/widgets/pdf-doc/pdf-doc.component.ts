import { Component, Input } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-pdf-doc',
  templateUrl: './pdf-doc.component.html',
  styleUrls: ['./pdf-doc.component.less'],
})
export class PdfDocComponent {
  @Input()
  public docUrl$!: Observable<string>;

  public openView$ = new BehaviorSubject<boolean>(false);

  public zoomPercent$ = new BehaviorSubject<number>(100);

  public zoom$ = this.zoomPercent$.pipe(
    map((zoom) => {
      return zoom / 100;
    })
  );

  // public originalSize$ = new BehaviorSubject<boolean>(true);

  public page$ = new BehaviorSubject<number>(1);

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');
}
