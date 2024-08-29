import { Component } from '@angular/core';
import { BannerService } from '../../../services/banner.service';

@Component({
  selector: 'app-banner-upload',
  templateUrl: './banner-upload.component.html',
  styleUrl: './banner-upload.component.scss',
})
export class BannerUploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadMessage: string = '';

  constructor(private bannerService: BannerService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.bannerService.uploadFile(this.selectedFile).subscribe({
        next: (event) => {
          this.uploadMessage = 'File uploaded successfully!';
        },
        error: (error) => {
          this.uploadMessage = 'Error uploading file.';
        },
      });
    } else {
      this.uploadMessage = 'No file selected!';
    }
  }
}
