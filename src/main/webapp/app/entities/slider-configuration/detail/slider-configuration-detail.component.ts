import { Component, inject, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/pipes/date';
import { DataUtils } from 'app/core/util/data-util.service';
import { ISliderConfiguration } from '../slider-configuration.model';

@Component({
  standalone: true,
  selector: 'jhi-slider-configuration-detail',
  templateUrl: './slider-configuration-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class SliderConfigurationDetailComponent {
  sliderConfiguration = input<ISliderConfiguration | null>(null);

  protected dataUtils = inject(DataUtils);

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  previousState(): void {
    window.history.back();
  }
}
