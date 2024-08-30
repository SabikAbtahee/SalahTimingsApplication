import { Component } from '@angular/core';
import { BannerUploadComponent } from "../banner-upload/banner-upload.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [BannerUploadComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
