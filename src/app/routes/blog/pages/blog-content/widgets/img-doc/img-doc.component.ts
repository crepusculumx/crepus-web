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

  placeholder =
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200';
}
