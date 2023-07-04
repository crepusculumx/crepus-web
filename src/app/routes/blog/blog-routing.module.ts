import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogContentComponent } from './pages/blog-content/blog-content.component';
import { BlogComponent } from './blog.component';
import { BlogWelcomeComponent } from './pages/blog-welcome/blog-welcome.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'welcome',
        component: BlogWelcomeComponent,
      },
      {
        path: 'file/:filePath',
        component: BlogContentComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
