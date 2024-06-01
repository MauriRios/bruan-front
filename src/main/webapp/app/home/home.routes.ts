import { RouterModule, Routes } from '@angular/router';
import { HomeNavigationComponent } from './home-navigation/home-navigation.component';
import { AboutUsComponent } from '../shared/components/about-us/about-us.component';
import { NgModule } from '@angular/core';

export const HOME_ROUTES: Routes = [ 

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
];

export const routing = RouterModule.forChild(HOME_ROUTES);

@NgModule({
    imports: [
    RouterModule.forChild(HOME_ROUTES)
  ],
    exports: [RouterModule]
  })
  export class UsersRoutingModule { }