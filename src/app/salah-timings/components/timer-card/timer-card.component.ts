import { Component, Input } from '@angular/core';
import { fuseAnimations } from '../../../shared/animations';

@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrl: './timer-card.component.scss',
  animations: fuseAnimations,
})
export class TimerCardComponent {
  timeText!: string;
  timeNumber!: string;

  @Input({ required: true })
  text!: string;
  @Input({ required: true }) set time(value: string | undefined) {
    if (value) {
      const values = value.split(' ');
      this.timeNumber = values[0];
      this.timeText = values[1];
    }
  }
}
