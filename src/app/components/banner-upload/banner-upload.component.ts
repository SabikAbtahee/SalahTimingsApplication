import { Component, ElementRef, ViewChild } from '@angular/core';
import { BannerService } from '../../services/banner.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'banner-upload',
  templateUrl: './banner-upload.component.html',
  styleUrl: './banner-upload.component.scss',
  standalone: true,
  imports: [AuthModalComponent, CommonModule, MatButtonModule],
})
export class BannerUploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadMessage: string = '';
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private bannerService: BannerService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.bannerService.uploadFile(this.selectedFile).subscribe({
        next: (event) => {
          this.uploadMessage = 'File uploaded successfully!';
          this.bannerService.fileUploaded.next(true);
        },
        error: (error) => {
          this.uploadMessage = 'Error uploading file.';
        },
      });
    } else {
      this.uploadMessage = 'No file selected!';
    }
  }
  selectFile() {
    this.fileInput.nativeElement.click();
  }
}
