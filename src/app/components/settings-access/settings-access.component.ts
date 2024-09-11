import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'settings-access',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './settings-access.component.html',
})
export class SettingsAccessComponent {
  constructor(private router: Router) {}

  routeToSettings() {
    this.router.navigate(['/settings']);
  }
}
