import { Component, computed, Input, signal } from '@angular/core';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [
    NzCardModule,
    NzInputNumberModule,
    NzSpaceModule,
    NzSwitchModule,
    NzDividerModule,
    NzAnchorModule,
    PdfViewerModule,
    FormsModule,
  ],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.less',
})
export class PdfViewerComponent {
  @Input({ required: true }) url!: string;

  openView = signal(false);

  page = signal(1);

  public zoomPercent = signal(100);

  public zoom = computed(() => {
    return this.zoomPercent() / 100;
  });

  formatterPercent = (value: number): string => `${value} %`;
  parserPercent = (value: string): string => value.replace(' %', '');
}
