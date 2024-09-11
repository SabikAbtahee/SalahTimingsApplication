import { Component } from '@angular/core';
import { first, tap } from 'rxjs';
import { BannerService } from '../../services/banner.service';
import { IBannersResponse } from '../../interfaces/IBannersResponse.interface';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeBannerInterval } from '../../constants/app.const';

@Component({
  selector: 'banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.scss',
  imports: [NgOptimizedImage, CommonModule, MatProgressSpinnerModule],
  standalone: true,
})
export class BannerSliderComponent {
  banners: IBannersResponse;
  currentAnnouncementImagePath: string = '';
  currentIndex: number = 0;
  constructor(private bannerService: BannerService) {}
  ngOnInit() {
    this.setBanners();
    this.toggleBanners();
  }
  setBanners() {
    this.banners = this.bannerService.getBannersFromLocalStorage();
    this.viewBanners();

    this.bannerService
      .getBanners()
      .pipe(
        first(),
        tap((res) => {
          this.bannerService.saveBannersToLocalStorage(res);
        })
      )
      .subscribe((res) => {
        this.banners = res;
        this.viewBanners();
      });
  }

  toggleBanners() {
    setInterval(() => {
      this.viewBanners();
    }, ChangeBannerInterval);
  }

  viewBanners() {
    if (this.banners?.banners?.length > 0) {
      const values = this.banners?.banners;
      this.currentAnnouncementImagePath = values[this.currentIndex].url;
      this.currentIndex = (this.currentIndex + 1) % values.length;
    }
  }
}
