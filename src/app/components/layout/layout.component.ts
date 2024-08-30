import { Component } from '@angular/core';
import { BannerSliderComponent } from '../banner-slider/banner-slider.component';
import { LogoComponent } from '../logo/logo.component';
import { SalahTimingsComponent } from '../salah-timings/salah-timings.component';
import { HizriDateComponent } from "../hizri-date/hizri-date.component";
import { SettingsAccessComponent } from "../settings-access/settings-access.component";

@Component({
  selector: 'layout',
  standalone: true,
  imports: [BannerSliderComponent, LogoComponent, SalahTimingsComponent, HizriDateComponent, SettingsAccessComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
