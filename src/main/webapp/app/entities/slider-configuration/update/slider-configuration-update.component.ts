import { Component, inject, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { SliderConfigurationService } from '../service/slider-configuration.service';
import { ISliderConfiguration } from '../slider-configuration.model';
import { SliderConfigurationFormService, SliderConfigurationFormGroup } from './slider-configuration-form.service';

@Component({
  standalone: true,
  selector: 'jhi-slider-configuration-update',
  templateUrl: './slider-configuration-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SliderConfigurationUpdateComponent implements OnInit {
  isSaving = false;
  sliderConfiguration: ISliderConfiguration | null = null;

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected sliderConfigurationService = inject(SliderConfigurationService);
  protected sliderConfigurationFormService = inject(SliderConfigurationFormService);
  protected elementRef = inject(ElementRef);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SliderConfigurationFormGroup = this.sliderConfigurationFormService.createSliderConfigurationFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sliderConfiguration }) => {
      this.sliderConfiguration = sliderConfiguration;
      if (sliderConfiguration) {
        this.updateForm(sliderConfiguration);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('bruanApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sliderConfiguration = this.sliderConfigurationFormService.getSliderConfiguration(this.editForm);
    if (sliderConfiguration.id !== null) {
      this.subscribeToSaveResponse(this.sliderConfigurationService.update(sliderConfiguration));
    } else {
      this.subscribeToSaveResponse(this.sliderConfigurationService.create(sliderConfiguration));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISliderConfiguration>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(sliderConfiguration: ISliderConfiguration): void {
    this.sliderConfiguration = sliderConfiguration;
    this.sliderConfigurationFormService.resetForm(this.editForm, sliderConfiguration);
  }
}
