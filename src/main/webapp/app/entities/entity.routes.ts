import { Routes } from '@angular/router';
import NavbarComponent from 'app/layouts/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
  },
  {
    path: 'authority',
    data: { pageTitle: 'bruanApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'product',
    data: { pageTitle: 'bruanApp.product.home.title' },
    loadChildren: () => import('./product/product.routes'),
  },
  {
    path: 'category',
    data: { pageTitle: 'bruanApp.category.home.title' },
    loadChildren: () => import('./category/category.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
