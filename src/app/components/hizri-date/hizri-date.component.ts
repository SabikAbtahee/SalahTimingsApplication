import { Component } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
import { TimingsService } from '../../services/timings.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'hizri-date',
  templateUrl: './hizri-date.component.html',
  standalone: true,
  imports: [CommonModule, DatePipe],
})
export class HizriDateComponent {
  clock!: Observable<Date>;
  hizriDate: string | null = null;
  englishDate: string | null = null;

  constructor(private timingsService: TimingsService) {}

  ngOnInit() {
    this.setDate();
    this.setClock();
  }
  setDate() {
    this.englishDate = this.timingsService.getEnglishDate();
    this.timingsService.getHizriDate().then((res) => {
      this.hizriDate = res;
    });
  }

  setClock() {
    this.clock = timer(0, 1000).pipe(
      tap(() => {
        if (new Date().getSeconds() === 0) {
          this.setDate();
        }
      }),
      map(() => new Date())
    );
  }
}
