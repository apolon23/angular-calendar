import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { Meetings } from './calendar/meetings.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  meetings: Meetings = {
    '2024-10-10': ['Drink Coffee', 'Learn English', 'Read Book'],
    '2024-10-23': ['Drink Tea', 'Learn Angular', 'Train'],
  }
}
