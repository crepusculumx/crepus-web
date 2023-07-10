import { NgModule } from '@angular/core';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FullIframeComponent } from './components/full-iframe/full-iframe.component';
import { AsyncPipe, NgIf, NgStyle } from '@angular/common';

@NgModule({
  declarations: [SafeUrlPipe, FullIframeComponent],
  imports: [...SHARED_ZORRO_MODULES, AsyncPipe, NgIf, NgStyle],
  exports: [...SHARED_ZORRO_MODULES, SafeUrlPipe, FullIframeComponent],
})
export class SharedModule {}
