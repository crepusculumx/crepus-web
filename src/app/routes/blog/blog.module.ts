import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { BlogComponent } from './pages/blog/blog.component';
import { HtmlDocComponent } from './pages/blog/widgets/html-doc/html-doc.component';

@NgModule({
  declarations: [BlogComponent, HtmlDocComponent],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
})
export class BlogModule {}
