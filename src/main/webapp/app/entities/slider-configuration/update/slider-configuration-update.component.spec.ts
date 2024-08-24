import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, from } from 'rxjs';

import { SliderConfigurationService } from '../service/slider-configuration.service';
import { ISliderConfiguration } from '../slider-configuration.model';
import { SliderConfigurationFormService } from './slider-configuration-form.service';

import { SliderConfigurationUpdateComponent } from './slider-configuration-update.component';

describe('SliderConfiguration Management Update Component', () => {
  let comp: SliderConfigurationUpdateComponent;
  let fixture: ComponentFixture<SliderConfigurationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let sliderConfigurationFormService: SliderConfigurationFormService;
  let sliderConfigurationService: SliderConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SliderConfigurationUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(SliderConfigurationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SliderConfigurationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    sliderConfigurationFormService = TestBed.inject(SliderConfigurationFormService);
    sliderConfigurationService = TestBed.inject(SliderConfigurationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const sliderConfiguration: ISliderConfiguration = { id: 456 };

      activatedRoute.data = of({ sliderConfiguration });
      comp.ngOnInit();

      expect(comp.sliderConfiguration).toEqual(sliderConfiguration);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISliderConfiguration>>();
      const sliderConfiguration = { id: 123 };
      jest.spyOn(sliderConfigurationFormService, 'getSliderConfiguration').mockReturnValue(sliderConfiguration);
      jest.spyOn(sliderConfigurationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sliderConfiguration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sliderConfiguration }));
      saveSubject.complete();

      // THEN
      expect(sliderConfigurationFormService.getSliderConfiguration).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(sliderConfigurationService.update).toHaveBeenCalledWith(expect.objectContaining(sliderConfiguration));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISliderConfiguration>>();
      const sliderConfiguration = { id: 123 };
      jest.spyOn(sliderConfigurationFormService, 'getSliderConfiguration').mockReturnValue({ id: null });
      jest.spyOn(sliderConfigurationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sliderConfiguration: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: sliderConfiguration }));
      saveSubject.complete();

      // THEN
      expect(sliderConfigurationFormService.getSliderConfiguration).toHaveBeenCalled();
      expect(sliderConfigurationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISliderConfiguration>>();
      const sliderConfiguration = { id: 123 };
      jest.spyOn(sliderConfigurationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ sliderConfiguration });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(sliderConfigurationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
