import { Component } from '@angular/core';
import { BannerService } from '../../services/banner.service';
import { IBannersResponse } from '../../interfaces/IBannersResponse.interface';
import { first, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'banner-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatIconModule, MatButtonModule],
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.scss',
})
export class BannerListComponent {
  bannerList: IBannersResponse;

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
    this.loadBanners();
    this.checkUpload();
  }
  trackByName(index: number, item: any): string {
    return item.name;
  }

  private loadBanners() {
    this.bannerService
      .getBanners()
      .pipe(first())
      .subscribe((res) => {
        this.bannerList = res;
      });
  }

  private checkUpload() {
    this.bannerService.fileUploaded.subscribe((res) => {
      this.loadBanners();
    });
  }
  deleteItem(event) {
    this.bannerService
      .deleteFile(event)
      .pipe(first())
      .subscribe((res) => {
        this.loadBanners();
      });
  }
}
