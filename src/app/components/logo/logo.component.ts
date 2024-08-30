import { Component } from '@angular/core';

@Component({
  selector: 'logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
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
