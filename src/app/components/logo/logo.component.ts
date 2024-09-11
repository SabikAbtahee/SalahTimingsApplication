import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'logo',
  standalone: true,
  imports: [NgOptimizedImage,CommonModule],
  templateUrl: './logo.component.html',
})
export class LogoComponent {
  logo: string;

  ngOnInit() {
    this.setLogo();
  }

  setLogo() {
    this.logo = 'assets/IALFM_QR_Code.jpg';
  }
}
