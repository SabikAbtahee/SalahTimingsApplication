import { Component } from '@angular/core';
import { BannerService } from '../../../services/banner.service';
import { first } from 'rxjs';
import { BannersResponse } from '../../../shared/app.interfaces';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.scss',
})
export class BannerSliderComponent {
  banners: BannersResponse;
  currentAnnouncementImagePath: string;
  currentIndex: number = 0;
  constructor(private bannerService: BannerService) {}
  ngOnInit() {
    this.setBanners();
    this.toggleBanners();
  }
  setBanners() {
    this.bannerService
      .getBanners()
      .pipe(first())
      .subscribe((res) => {
        this.banners = res;
      });
  }

  toggleBanners() {
    setInterval(() => {
      if (this.banners?.banners.length > 0) {
        const values = this.banners?.banners;
        this.currentAnnouncementImagePath = values[this.currentIndex].url;
        this.currentIndex = (this.currentIndex + 1) % values.length;
      }
    }, 5000);
  }
}
