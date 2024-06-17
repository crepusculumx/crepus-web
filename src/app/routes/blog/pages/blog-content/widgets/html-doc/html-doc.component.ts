import { Component, Input } from '@angular/core';
import { FullIframeComponent } from './full-iframe/full-iframe.component';

@Component({
  selector: 'app-html-doc',
  standalone: true,
  imports: [FullIframeComponent],
  templateUrl: './html-doc.component.html',
  styleUrl: './html-doc.component.less',
})
export class HtmlDocComponent {
  @Input({ required: true }) public docUrl!: string;
}
