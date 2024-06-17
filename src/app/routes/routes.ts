import { Route } from '@angular/router';

import { BasicLayoutComponent } from '../layout/basic-layout/basic-layout.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'blog',
  },
  {
    path: 'blog',
    component: BasicLayoutComponent,
    loadChildren: () => import('./blog/routes'),
  },
] as Route[];
