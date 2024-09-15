import { Component, ElementRef, ViewChild } from '@angular/core';
import { BannerService } from '../../services/banner.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { first } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'banner-upload',
  templateUrl: './banner-upload.component.html',
  styleUrl: './banner-upload.component.scss',
  standalone: true,
  imports: [
    AuthModalComponent,
    CommonModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class BannerUploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadMessage: string = '';
  isUploading: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(
    private bannerService: BannerService,
    private _snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.isUploading = true;
      this.bannerService
        .uploadFile(this.selectedFile)
        .pipe(first())
        .subscribe({
          next: (event) => {
            this.uploadMessage = 'File uploaded successfully!';
            this.bannerService.fileUploaded.next(true);
            this._snackBar.open('File uploaded successfully!', '', {
              duration: 4 * 1000,
            });
          },
          error: (error) => {
            this.uploadMessage = 'Error uploading file.';
          },
          complete: () => {
            this.isUploading = false;
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
