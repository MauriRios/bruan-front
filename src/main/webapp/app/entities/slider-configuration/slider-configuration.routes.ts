import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { SliderConfigurationComponent } from './list/slider-configuration.component';
import { SliderConfigurationDetailComponent } from './detail/slider-configuration-detail.component';
import { SliderConfigurationUpdateComponent } from './update/slider-configuration-update.component';
import SliderConfigurationResolve from './route/slider-configuration-routing-resolve.service';

const sliderConfigurationRoute: Routes = [
  {
    path: '',
    component: SliderConfigurationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SliderConfigurationDetailComponent,
    resolve: {
      sliderConfiguration: SliderConfigurationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SliderConfigurationUpdateComponent,
    resolve: {
      sliderConfiguration: SliderConfigurationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SliderConfigurationUpdateComponent,
    resolve: {
      sliderConfiguration: SliderConfigurationResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default sliderConfigurationRoute;
