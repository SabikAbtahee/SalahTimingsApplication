import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'settings-access',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './settings-access.component.html',
})
export class SettingsAccessComponent {
    constructor(private router: Router) { }

    routeToSettings() {
        this.router.navigate(['/upload']);
  }
}
