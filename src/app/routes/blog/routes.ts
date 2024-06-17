import { Route } from '@angular/router';
import { BlogComponent } from './blog.component';
import { BlogWelcomeComponent } from './pages/blog-welcome/blog-welcome.component';
import { BlogContentComponent } from './pages/blog-content/blog-content.component';

export default [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'welcome',
        component: BlogWelcomeComponent,
      },
      {
        path: ':userName/file/:filePath',
        component: BlogContentComponent,
      },
      {
        path: '**',
        // pathMatch: 'prefix',
        redirectTo: 'welcome',
      },
    ],
  },
] as Route[];
