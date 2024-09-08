import { RouterModule, Routes } from '@angular/router';
import { HomeNavigationComponent } from './home-navigation/home-navigation.component';
import { AboutUsComponent } from '../shared/components/about-us/about-us.component';
import { NgModule } from '@angular/core';
import { NavbarHomeComponent } from 'app/shared/components/navbar-home/navbar-home.component';
import { FooterHomeComponent } from 'app/shared/components/footer/footer.component';
import { DynamicCategoriesComponent } from 'app/shared/components/dynamic-categories/dynamic-categories/dynamic-categories.component';

export const HOME_ROUTES: Routes = [ 
    {
        path: '',
        component: NavbarHomeComponent,
        outlet: 'navbarHome',
    },
    {
        path: '',
        component: FooterHomeComponent,
        outlet: 'footerHome',
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeNavigationComponent
    },
    {
        path: 'about',
        component: AboutUsComponent,
    },
    { path: 'categoria/:categoria',
         component: DynamicCategoriesComponent },

];

export const routing = RouterModule.forChild(HOME_ROUTES);

@NgModule({
    imports: [
    RouterModule.forChild(HOME_ROUTES)
  ],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }