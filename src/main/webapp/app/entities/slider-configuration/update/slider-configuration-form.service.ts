import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ISliderConfiguration, NewSliderConfiguration } from '../slider-configuration.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISliderConfiguration for edit and NewSliderConfigurationFormGroupInput for create.
 */
type SliderConfigurationFormGroupInput = ISliderConfiguration | PartialWithRequiredKeyOf<NewSliderConfiguration>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ISliderConfiguration | NewSliderConfiguration> = Omit<T, 'createDate' | 'lastModifyDate'> & {
  createDate?: string | null;
  lastModifyDate?: string | null;
};

type SliderConfigurationFormRawValue = FormValueOf<ISliderConfiguration>;

type NewSliderConfigurationFormRawValue = FormValueOf<NewSliderConfiguration>;

type SliderConfigurationFormDefaults = Pick<NewSliderConfiguration, 'id' | 'createDate' | 'lastModifyDate'>;

type SliderConfigurationFormGroupContent = {
  id: FormControl<SliderConfigurationFormRawValue['id'] | NewSliderConfiguration['id']>;
  sliderName: FormControl<SliderConfigurationFormRawValue['sliderName']>;
  sliderDescription: FormControl<SliderConfigurationFormRawValue['sliderDescription']>;
  image: FormControl<SliderConfigurationFormRawValue['image']>;
  imageContentType: FormControl<SliderConfigurationFormRawValue['imageContentType']>;
  createDate: FormControl<SliderConfigurationFormRawValue['createDate']>;
  lastModifyDate: FormControl<SliderConfigurationFormRawValue['lastModifyDate']>;
};

export type SliderConfigurationFormGroup = FormGroup<SliderConfigurationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SliderConfigurationFormService {
  createSliderConfigurationFormGroup(sliderConfiguration: SliderConfigurationFormGroupInput = { id: null }): SliderConfigurationFormGroup {
    const sliderConfigurationRawValue = this.convertSliderConfigurationToSliderConfigurationRawValue({
      ...this.getFormDefaults(),
      ...sliderConfiguration,
    });
    return new FormGroup<SliderConfigurationFormGroupContent>({
      id: new FormControl(
        { value: sliderConfigurationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      sliderName: new FormControl(sliderConfigurationRawValue.sliderName),
      sliderDescription: new FormControl(sliderConfigurationRawValue.sliderDescription),
      image: new FormControl(sliderConfigurationRawValue.image),
      imageContentType: new FormControl(sliderConfigurationRawValue.imageContentType),
      createDate: new FormControl(sliderConfigurationRawValue.createDate),
      lastModifyDate: new FormControl(sliderConfigurationRawValue.lastModifyDate),
    });
  }

  getSliderConfiguration(form: SliderConfigurationFormGroup): ISliderConfiguration | NewSliderConfiguration {
    return this.convertSliderConfigurationRawValueToSliderConfiguration(
      form.getRawValue() as SliderConfigurationFormRawValue | NewSliderConfigurationFormRawValue,
    );
  }

  resetForm(form: SliderConfigurationFormGroup, sliderConfiguration: SliderConfigurationFormGroupInput): void {
    const sliderConfigurationRawValue = this.convertSliderConfigurationToSliderConfigurationRawValue({
      ...this.getFormDefaults(),
      ...sliderConfiguration,
    });
    form.reset(
      {
        ...sliderConfigurationRawValue,
        id: { value: sliderConfigurationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SliderConfigurationFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createDate: currentTime,
      lastModifyDate: currentTime,
    };
  }

  private convertSliderConfigurationRawValueToSliderConfiguration(
    rawSliderConfiguration: SliderConfigurationFormRawValue | NewSliderConfigurationFormRawValue,
  ): ISliderConfiguration | NewSliderConfiguration {
    return {
      ...rawSliderConfiguration,
      createDate: dayjs(rawSliderConfiguration.createDate, DATE_TIME_FORMAT),
      lastModifyDate: dayjs(rawSliderConfiguration.lastModifyDate, DATE_TIME_FORMAT),
    };
  }

  private convertSliderConfigurationToSliderConfigurationRawValue(
    sliderConfiguration: ISliderConfiguration | (Partial<NewSliderConfiguration> & SliderConfigurationFormDefaults),
  ): SliderConfigurationFormRawValue | PartialWithRequiredKeyOf<NewSliderConfigurationFormRawValue> {
    return {
      ...sliderConfiguration,
      createDate: sliderConfiguration.createDate ? sliderConfiguration.createDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifyDate: sliderConfiguration.lastModifyDate ? sliderConfiguration.lastModifyDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
