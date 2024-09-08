import { Component } from '@angular/core';
import { first } from 'rxjs';
import { BannerService } from '../../services/banner.service';
import { IBannersResponse } from '../../interfaces/IBannersResponse.interface';

@Component({
  selector: 'banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.scss',
  standalone: true,
})
export class BannerSliderComponent {
  banners: IBannersResponse;
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
    }, 20000);
  }
}
