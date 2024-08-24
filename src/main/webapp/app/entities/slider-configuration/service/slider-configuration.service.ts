import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISliderConfiguration, NewSliderConfiguration } from '../slider-configuration.model';

export type PartialUpdateSliderConfiguration = Partial<ISliderConfiguration> & Pick<ISliderConfiguration, 'id'>;

type RestOf<T extends ISliderConfiguration | NewSliderConfiguration> = Omit<T, 'createDate' | 'lastModifyDate'> & {
  createDate?: string | null;
  lastModifyDate?: string | null;
};

export type RestSliderConfiguration = RestOf<ISliderConfiguration>;

export type NewRestSliderConfiguration = RestOf<NewSliderConfiguration>;

export type PartialUpdateRestSliderConfiguration = RestOf<PartialUpdateSliderConfiguration>;

export type EntityResponseType = HttpResponse<ISliderConfiguration>;
export type EntityArrayResponseType = HttpResponse<ISliderConfiguration[]>;

@Injectable({ providedIn: 'root' })
export class SliderConfigurationService {
  protected http = inject(HttpClient);
  protected applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/slider-configurations');

  create(sliderConfiguration: NewSliderConfiguration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sliderConfiguration);
    return this.http
      .post<RestSliderConfiguration>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(sliderConfiguration: ISliderConfiguration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sliderConfiguration);
    return this.http
      .put<RestSliderConfiguration>(`${this.resourceUrl}/${this.getSliderConfigurationIdentifier(sliderConfiguration)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(sliderConfiguration: PartialUpdateSliderConfiguration): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sliderConfiguration);
    return this.http
      .patch<RestSliderConfiguration>(`${this.resourceUrl}/${this.getSliderConfigurationIdentifier(sliderConfiguration)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestSliderConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestSliderConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getSliderConfigurationIdentifier(sliderConfiguration: Pick<ISliderConfiguration, 'id'>): number {
    return sliderConfiguration.id;
  }

  compareSliderConfiguration(o1: Pick<ISliderConfiguration, 'id'> | null, o2: Pick<ISliderConfiguration, 'id'> | null): boolean {
    return o1 && o2 ? this.getSliderConfigurationIdentifier(o1) === this.getSliderConfigurationIdentifier(o2) : o1 === o2;
  }

  addSliderConfigurationToCollectionIfMissing<Type extends Pick<ISliderConfiguration, 'id'>>(
    sliderConfigurationCollection: Type[],
    ...sliderConfigurationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sliderConfigurations: Type[] = sliderConfigurationsToCheck.filter(isPresent);
    if (sliderConfigurations.length > 0) {
      const sliderConfigurationCollectionIdentifiers = sliderConfigurationCollection.map(sliderConfigurationItem =>
        this.getSliderConfigurationIdentifier(sliderConfigurationItem),
      );
      const sliderConfigurationsToAdd = sliderConfigurations.filter(sliderConfigurationItem => {
        const sliderConfigurationIdentifier = this.getSliderConfigurationIdentifier(sliderConfigurationItem);
        if (sliderConfigurationCollectionIdentifiers.includes(sliderConfigurationIdentifier)) {
          return false;
        }
        sliderConfigurationCollectionIdentifiers.push(sliderConfigurationIdentifier);
        return true;
      });
      return [...sliderConfigurationsToAdd, ...sliderConfigurationCollection];
    }
    return sliderConfigurationCollection;
  }

  protected convertDateFromClient<T extends ISliderConfiguration | NewSliderConfiguration | PartialUpdateSliderConfiguration>(
    sliderConfiguration: T,
  ): RestOf<T> {
    return {
      ...sliderConfiguration,
      createDate: sliderConfiguration.createDate?.toJSON() ?? null,
      lastModifyDate: sliderConfiguration.lastModifyDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restSliderConfiguration: RestSliderConfiguration): ISliderConfiguration {
    return {
      ...restSliderConfiguration,
      createDate: restSliderConfiguration.createDate ? dayjs(restSliderConfiguration.createDate) : undefined,
      lastModifyDate: restSliderConfiguration.lastModifyDate ? dayjs(restSliderConfiguration.lastModifyDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestSliderConfiguration>): HttpResponse<ISliderConfiguration> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestSliderConfiguration[]>): HttpResponse<ISliderConfiguration[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
