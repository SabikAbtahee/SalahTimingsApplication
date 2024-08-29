import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  logo: string;

  ngOnInit() {
    this.setLogo();
  }

  setLogo() {
    this.logo = 'assets/Logo.jpg';
  }
}
