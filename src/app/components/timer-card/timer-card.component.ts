import { Component, Input } from '@angular/core';
import { fuseAnimations } from '../../animations/animations';

@Component({
  selector: 'timer-card',
  templateUrl: './timer-card.component.html',
  animations: fuseAnimations,
  standalone: true,
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
