import { Component, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-pdf-doc',
  templateUrl: './pdf-doc.component.html',
  styleUrls: ['./pdf-doc.component.less'],
})
export class PdfDocComponent {
  @Input()
  public docUrl$!: Observable<string>;

  public openView$ = new BehaviorSubject<boolean>(false);
}
