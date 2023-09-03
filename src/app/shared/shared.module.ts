import { NgModule } from '@angular/core';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FullIframeComponent } from './components/full-iframe/full-iframe.component';
import { AsyncPipe, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { SpinImgComponent } from './components/spin-img/spin-img.component';

@NgModule({
  declarations: [SafeUrlPipe, FullIframeComponent, SpinImgComponent],
  imports: [
    ...SHARED_ZORRO_MODULES,
    AsyncPipe,
    NgIf,
    NgStyle,
    NgOptimizedImage,
  ],
  exports: [
    ...SHARED_ZORRO_MODULES,
    SafeUrlPipe,
    FullIframeComponent,
    SpinImgComponent,
  ],
})
export class SharedModule {}
