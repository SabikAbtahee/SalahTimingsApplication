import { Component } from '@angular/core';
import { fuseAnimations } from '../../../shared/animations';
import { TimingsService } from '../../../services/timings.service';
import { first } from 'rxjs';
import { IPrayerTimings } from '../../../shared/app.interfaces';
@Component({
  selector: 'app-salah-timings',
  templateUrl: './salah-timings.component.html',
  styleUrl: './salah-timings.component.scss',
  animations: fuseAnimations,
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
    }, 3000);
  }

  refreshSalahTime() {
    setInterval(() => {
      this.setSalahTime();
    }, 3600 * 1000);
  }
}
