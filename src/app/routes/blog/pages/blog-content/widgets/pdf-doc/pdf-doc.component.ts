import { Component, Input } from '@angular/core';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-pdf-doc',
  standalone: true,
  imports: [PdfViewerComponent],
  templateUrl: './pdf-doc.component.html',
  styleUrl: './pdf-doc.component.less',
})
export class PdfDocComponent {
  @Input({ required: true }) public docUrl!: string;
}
