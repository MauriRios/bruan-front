import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISliderConfiguration } from '../slider-configuration.model';
import { SliderConfigurationService } from '../service/slider-configuration.service';

const sliderConfigurationResolve = (route: ActivatedRouteSnapshot): Observable<null | ISliderConfiguration> => {
  const id = route.params['id'];
  if (id) {
    return inject(SliderConfigurationService)
      .find(id)
      .pipe(
        mergeMap((sliderConfiguration: HttpResponse<ISliderConfiguration>) => {
          if (sliderConfiguration.body) {
            return of(sliderConfiguration.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default sliderConfigurationResolve;
