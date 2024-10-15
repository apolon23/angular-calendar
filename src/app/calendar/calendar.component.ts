import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime, DateTimeFormatOptions, Info, Interval } from 'luxon';
import { Meetings } from './meetings.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  public meetings: InputSignal<Meetings> = input.required();
  public today: Signal<DateTime> = signal(DateTime.local());
  public firstDayOfActiveMonth: WritableSignal<DateTime> = signal(this.today().startOf('month'));
  public activeDay: WritableSignal<DateTime | null> = signal(null);
  public weekdays: Signal<Array<string>> = signal(Info.weekdays('short',{locale: 'en'}));
  public daysOfMonth: Signal<Array<DateTime>> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week')
    ).splitBy({day: 1}).map((d: Interval) => {
      if (d.start === null) {
        throw new Error('Wrong Dates');
      }
      return d.start;
    });
  });

  public DATE_MED: DateTimeFormatOptions = DateTime.DATE_MED;

  public activeDayMeetings: Signal<Array<string>> = computed(() => {
    const activeDay: DateTime | null = this.activeDay();
    if (activeDay === null) {
      return [];
    }
    const activeDayISO: string | null = activeDay.toISODate();
    if (!activeDayISO) {
      return [];
    }
    return this.meetings()[activeDayISO] ?? [];
  });

  public goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({month: 1})
    );
  }
  public goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({month: 1})
    );
  }
  public goToTodayMonth(): void {
    this.activeDay.set(this.today().startOf('month'));
    this.firstDayOfActiveMonth.set(
      this.today().startOf('month')
    );
  }
}
