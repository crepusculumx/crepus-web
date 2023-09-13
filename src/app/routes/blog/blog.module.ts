import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { BlogContentComponent } from './pages/blog-content/blog-content.component';
import { HtmlDocComponent } from './pages/blog-content/widgets/html-doc/html-doc.component';
import { BlogWelcomeComponent } from './pages/blog-welcome/blog-welcome.component';
import { BlogComponent } from './blog.component';
import { UserCardsComponent } from './pages/blog-welcome/widgets/user-cards/user-cards.component';
import { ImgDocComponent } from './pages/blog-content/widgets/img-doc/img-doc.component';
import { PdfDocComponent } from './pages/blog-content/widgets/pdf-doc/pdf-doc.component';

@NgModule({
  declarations: [
    BlogContentComponent,
    HtmlDocComponent,
    BlogWelcomeComponent,
    BlogComponent,
    UserCardsComponent,
    ImgDocComponent,
    PdfDocComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule, FormsModule],
})
export class BlogModule {}
