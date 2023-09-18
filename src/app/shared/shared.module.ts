import { NgModule } from '@angular/core';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FullIframeComponent } from './components/full-iframe/full-iframe.component';
import { AsyncPipe, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SpinImgComponent } from './components/spin-img/spin-img.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';

@NgModule({
  declarations: [
    SafeUrlPipe,
    FullIframeComponent,
    SpinImgComponent,
    PdfViewerComponent,
  ],
  imports: [
    ...SHARED_ZORRO_MODULES,
    AsyncPipe,
    NgIf,
    NgStyle,
    NgOptimizedImage,
    PdfViewerModule,
  ],
  exports: [
    ...SHARED_ZORRO_MODULES,
    SafeUrlPipe,
    FullIframeComponent,
    SpinImgComponent,
    PdfViewerComponent,
  ],
})
export class SharedModule {}
