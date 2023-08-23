import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-img-doc',
  templateUrl: './img-doc.component.html',
  styleUrls: ['./img-doc.component.less'],
})
export class ImgDocComponent {
  @Input()
  public docUrl$!: Observable<string>;
}
