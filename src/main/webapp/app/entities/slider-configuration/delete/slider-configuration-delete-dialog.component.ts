import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISliderConfiguration } from '../slider-configuration.model';
import { SliderConfigurationService } from '../service/slider-configuration.service';

@Component({
  standalone: true,
  templateUrl: './slider-configuration-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SliderConfigurationDeleteDialogComponent {
  sliderConfiguration?: ISliderConfiguration;

  protected sliderConfigurationService = inject(SliderConfigurationService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sliderConfigurationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
