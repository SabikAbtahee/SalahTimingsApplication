import { Component } from '@angular/core';
import { fuseAnimations } from '../../animations/animations';
import { TimingsService } from '../../services/timings.service';
import { first } from 'rxjs';
import { TimerCardComponent } from '../timer-card/timer-card.component';
import { IPrayerTimings } from '../../interfaces/IPrayerTimings.interface';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ChangeSalahInterval } from '../../constants/app.const';
@Component({
  selector: 'salah-timings',
  templateUrl: './salah-timings.component.html',
  animations: fuseAnimations,
  standalone: true,
  imports: [TimerCardComponent, NgxSkeletonLoaderModule],
  styleUrl: './salah-timings.component.scss',
})
export class SalahTimingsComponent {
  salahTimings!: Array<{ key: string; value: string }>;
  jummahTimings!: Array<{ key: string; value: string }>;
  changeScene: boolean = false;
  constructor(private timingsService: TimingsService) {}

  ngOnInit() {
    this.setSalahTime();
    this.changeScenes();
    this.refreshSalahTime();
  }

  setSalahTime() {
    this.timingsService
      .getTimings()
      .pipe(first())
      .subscribe((res: IPrayerTimings) => {
        const iqamah = res.Iqamah;
        const mapped = Object.keys(res?.Iqamah).map((key) => ({
          key,
          value: iqamah[key],
        }));
        this.salahTimings = mapped.slice(0, 5);
        this.jummahTimings = mapped.slice(5);
      });
  }

  changeScenes() {
    setInterval(() => {
      this.changeScene = !this.changeScene;
    }, this.timingsService.getSalahIntervalFromLocalStorage());
  }

  refreshSalahTime() {
    setInterval(() => {
      this.setSalahTime();
    }, 3600 * 1000);
  }
}
