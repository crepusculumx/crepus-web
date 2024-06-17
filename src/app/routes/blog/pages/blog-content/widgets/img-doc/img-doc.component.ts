import { Component, Input } from '@angular/core';
import { SpinImgComponent } from './spin-img/spin-img.component';

@Component({
  selector: 'app-img-doc',
  standalone: true,
  imports: [SpinImgComponent],
  templateUrl: './img-doc.component.html',
  styleUrl: './img-doc.component.less',
})
export class ImgDocComponent {
  @Input({ required: true }) public docUrl!: string;
}
