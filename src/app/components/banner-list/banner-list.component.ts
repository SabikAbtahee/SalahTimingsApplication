import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter, first, Subject, takeUntil } from 'rxjs';
import { IBannersResponse } from '../../interfaces/IBannersResponse.interface';
import { BannerService } from '../../services/banner.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'banner-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  templateUrl: './banner-list.component.html',
  styleUrl: './banner-list.component.scss',
})
export class BannerListComponent {
  bannerList: IBannersResponse | null;
  _unsubscribeAll: Subject<void>;
  constructor(
    private bannerService: BannerService,
    private _snackBar: MatSnackBar
  ) {
    this._unsubscribeAll = new Subject();
  }

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
    this.bannerService.fileUploaded
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter((res) => res != false)
      )
      .subscribe((res) => {
        this.loadBanners();
      });
  }
  deleteItem(event) {
    this.bannerService
      .deleteFile(event)
      .pipe(first())
      .subscribe((res) => {
        this._snackBar.open('File Deleted', '', {
          duration: 4 * 1000,
        });
        this.loadBanners();
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.unsubscribe();
  }
}
