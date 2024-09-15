import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { first, tap } from 'rxjs';
import { IBannersResponse } from '../../interfaces/IBannersResponse.interface';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrl: './banner-slider.component.scss',
  imports: [
    NgOptimizedImage,
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  standalone: true,
})
export class BannerSliderComponent {
  banners: IBannersResponse;
  currentAnnouncementImagePath: string = '';
  currentIndex: number = 0;
  currentInterval;
  isLocked: boolean = false;
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
    this.currentInterval = setInterval(() => {
      this.slideFront();
    }, this.bannerService.getBannerIntervalFromLocalStorage());
  }

  lockInterval() {
    if (this.currentInterval && !this.isLocked) {
      clearInterval(this.currentInterval);
      this.isLocked = true;
    }
  }

  unlockInterval() {
    if (this.isLocked) {
      this.toggleBanners();
      this.isLocked = false;
    }
  }

  viewBanners() {
    if (this.banners?.banners?.length > 0) {
      const values = this.banners?.banners;
      this.currentAnnouncementImagePath = values[this.currentIndex].url;
      //   this.currentIndex = (this.currentIndex + 1) % values.length;
    }
  }

  slideBack() {
    const lengthOfBanners = this.banners?.banners?.length;
    this.currentIndex =
      this.currentIndex - 1 < 0 ? lengthOfBanners - 1 : this.currentIndex - 1;
    this.viewBanners();
  }

  slideFront() {
    const lengthOfBanners = this.banners?.banners?.length;
    this.currentIndex = (this.currentIndex + 1) % lengthOfBanners;
    this.viewBanners();
  }
}
