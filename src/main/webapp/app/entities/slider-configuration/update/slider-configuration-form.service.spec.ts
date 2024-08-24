import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../slider-configuration.test-samples';

import { SliderConfigurationFormService } from './slider-configuration-form.service';

describe('SliderConfiguration Form Service', () => {
  let service: SliderConfigurationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SliderConfigurationFormService);
  });

  describe('Service methods', () => {
    describe('createSliderConfigurationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSliderConfigurationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sliderName: expect.any(Object),
            sliderDescription: expect.any(Object),
            image: expect.any(Object),
            createDate: expect.any(Object),
            lastModifyDate: expect.any(Object),
          }),
        );
      });

      it('passing ISliderConfiguration should create a new form with FormGroup', () => {
        const formGroup = service.createSliderConfigurationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sliderName: expect.any(Object),
            sliderDescription: expect.any(Object),
            image: expect.any(Object),
            createDate: expect.any(Object),
            lastModifyDate: expect.any(Object),
          }),
        );
      });
    });

    describe('getSliderConfiguration', () => {
      it('should return NewSliderConfiguration for default SliderConfiguration initial value', () => {
        const formGroup = service.createSliderConfigurationFormGroup(sampleWithNewData);

        const sliderConfiguration = service.getSliderConfiguration(formGroup) as any;

        expect(sliderConfiguration).toMatchObject(sampleWithNewData);
      });

      it('should return NewSliderConfiguration for empty SliderConfiguration initial value', () => {
        const formGroup = service.createSliderConfigurationFormGroup();

        const sliderConfiguration = service.getSliderConfiguration(formGroup) as any;

        expect(sliderConfiguration).toMatchObject({});
      });

      it('should return ISliderConfiguration', () => {
        const formGroup = service.createSliderConfigurationFormGroup(sampleWithRequiredData);

        const sliderConfiguration = service.getSliderConfiguration(formGroup) as any;

        expect(sliderConfiguration).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISliderConfiguration should not enable id FormControl', () => {
        const formGroup = service.createSliderConfigurationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSliderConfiguration should disable id FormControl', () => {
        const formGroup = service.createSliderConfigurationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
