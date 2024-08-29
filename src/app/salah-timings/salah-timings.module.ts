import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SalahTimingsComponent } from './components/salah-timings/salah-timings.component';
import { TimerCardComponent } from './components/timer-card/timer-card.component';
import { HizriDateComponent } from './components/hizri-date/hizri-date.component';
import { LogoComponent } from "../logo/logo.component";

@NgModule({
  declarations: [SalahTimingsComponent, HizriDateComponent, TimerCardComponent],
  exports: [SalahTimingsComponent],
  imports: [CommonModule, LogoComponent],
})
export class SalahTimingsModule {}
