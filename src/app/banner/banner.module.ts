import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { BannerSliderComponent } from './components/banner-slider/banner-slider.component';
import { BannerUploadComponent } from './components/banner-upload/banner-upload.component';

@NgModule({
  declarations: [BannerSliderComponent,BannerUploadComponent],
  exports: [BannerSliderComponent],
  imports: [CommonModule, NgOptimizedImage],
})
export class BannerModule {}
