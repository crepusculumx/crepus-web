import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { BlogContentComponent } from './pages/blog-content/blog-content.component';
import { HtmlDocComponent } from './pages/blog-content/widgets/html-doc/html-doc.component';
import { BlogWelcomeComponent } from './pages/blog-welcome/blog-welcome.component';
import { BlogComponent } from './blog.component';

@NgModule({
  declarations: [
    BlogContentComponent,
    HtmlDocComponent,
    BlogWelcomeComponent,
    BlogComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
})
export class BlogModule {}
