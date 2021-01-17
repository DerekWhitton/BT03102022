import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'bushtrade-web-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() endDate: Date;

  private subscription: Subscription;

  public parsedEndDate: Date;
  public dateNow = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: number;
  public secondsToDday: number;
  public minutesToDday: number;
  public hoursToDday: number;
  public daysToDday: number;

  constructor() {}

  ngOnInit(): void {
    this.parsedEndDate = new Date(this.endDate);
    if (this.parsedEndDate != null && this.parsedEndDate instanceof Date) {
      this.subscription = interval(this.milliSecondsInASecond).subscribe(() => {
        this.getTimeDifference();
      });
    }
  }

  private getTimeDifference() {
    this.timeDifference = this.parsedEndDate.getTime() - new Date().getTime();
    if (this.timeDifference >= 0) {
      this.allocateTimeUnits(this.timeDifference);
    }
  }

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
