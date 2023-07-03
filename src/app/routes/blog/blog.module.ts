import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { HtmlDocComponent } from './widgets/html-doc/html-doc.component';

@NgModule({
  declarations: [BlogComponent, HtmlDocComponent],
  imports: [CommonModule, BlogRoutingModule],
})
export class BlogModule {}
