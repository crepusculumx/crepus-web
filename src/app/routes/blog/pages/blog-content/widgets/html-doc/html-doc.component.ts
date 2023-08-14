import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-html-doc',
  templateUrl: './html-doc.component.html',
  styleUrls: ['./html-doc.component.less'],
})
export class HtmlDocComponent {
  @Input()
  public docUrl$!: Observable<string>;
}
