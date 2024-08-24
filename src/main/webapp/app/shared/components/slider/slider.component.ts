/* eslint-disable @angular-eslint/component-selector */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SliderConfigurationService } from 'app/entities/slider-configuration/service/slider-configuration.service';
import { ISliderConfiguration } from 'app/entities/slider-configuration/slider-configuration.model';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit {

  sliderConfigurations: ISliderConfiguration[] = [];

  
  constructor(
    private sliderConfigurationService: SliderConfigurationService
  ) {

  }

  ngOnInit(): void {
    this.loadSliderConfiguration();
  }

  public loadSliderConfiguration(): void {
    this.sliderConfigurationService.query().subscribe(
      (res) => {
        this.sliderConfigurations = res.body ?? [];
      },
      (error) => {
        console.error('Error al cargar Slider Configuration:', error);
      }
    );
  }

  public getImageSrc(sliderConfiguration: ISliderConfiguration): string | undefined {
    if (sliderConfiguration.image && sliderConfiguration.imageContentType) {
      return `data:${sliderConfiguration.imageContentType};base64,${sliderConfiguration.image}`;
    }
    return undefined;
  }


}
