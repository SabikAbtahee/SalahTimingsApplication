import { Component } from '@angular/core';
import { BannerUploadComponent } from '../banner-upload/banner-upload.component';
import { BannerListComponent } from '../banner-list/banner-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BehaviorSubject } from 'rxjs';
import { BannerService } from '../../services/banner.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    BannerUploadComponent,
    BannerListComponent,
    MatProgressBarModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  isLoading$: BehaviorSubject<boolean>;

  constructor(private bannerService: BannerService) {
    this.isLoading$ = this.bannerService.isLoading;
  }
  ngOnInit() {}
}
