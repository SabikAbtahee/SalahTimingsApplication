import { Component } from '@angular/core';
import { BannerUploadComponent } from '../banner-upload/banner-upload.component';
import { BannerListComponent } from '../banner-list/banner-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BehaviorSubject } from 'rxjs';
import { BannerService } from '../../services/banner.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TimingsService } from '../../services/timings.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    BannerUploadComponent,
    BannerListComponent,
    MatProgressBarModule,
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  bannerSlideInterval: FormControl = new FormControl(0);
  salahTimeChangeInterval: FormControl = new FormControl(0);
  isLoading$: BehaviorSubject<boolean>;

  constructor(
    private bannerService: BannerService,
    private timingService: TimingsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.isLoading$ = this.bannerService.isLoading;
  }
  ngOnInit() {
    this.setTimeIntervals();
  }

  setTimeIntervals() {
    this.salahTimeChangeInterval.setValue(
      this.timingService.getSalahIntervalFromLocalStorage() / 1000
    );
    this.bannerSlideInterval.setValue(
      this.bannerService.getBannerIntervalFromLocalStorage() / 1000
    );
  }

  saveTimeSettings() {
    if (this.salahTimeChangeInterval.value > 0) {
      this.timingService.saveSalahIntervalToLocalStorage(
        this.salahTimeChangeInterval.value * 1000
      );
    }
    if (this.bannerSlideInterval.value > 0) {
      this.bannerService.saveBannerIntervalToLocalStorage(
        this.bannerSlideInterval.value * 1000
      );
    }
    this._snackBar.open('Timings Saved', '', {
      duration: 4 * 1000,
    });
  }

  gotoHome() {
    this.router.navigateByUrl('/home');
  }
}
