import { Component, Input, signal } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-spin-img',
  standalone: true,
  imports: [NzSpinModule, NzImageModule],
  templateUrl: './spin-img.component.html',
  styleUrl: './spin-img.component.less',
})
export class SpinImgComponent {
  @Input({ required: true }) imgUrl!: string;

  public spinning = signal(true);
}
