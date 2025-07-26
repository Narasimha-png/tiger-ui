import { Component } from '@angular/core';
import { ImportsModule } from '../app/imports';
import { ProfileService, StreakData, User } from '../app/profile.service';
import { AuthService } from '../app/auth.service';

@Component({
  selector: 'app-streak',
  imports: [ImportsModule],
  providers: [ProfileService ],
  templateUrl: './streak.component.html',
  styleUrl: './streak.component.scss',
})
export class StreakComponent {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  todayMonth = this.currentDate.getMonth();
  joinedMonth: Number | undefined;
  joinedAt: string | undefined;
  streakData: StreakData | undefined;
  user: User | null = null;
  loadingStates: string[] = [
    'Good Things Take time....',
    'Scanning Github Repos...',
    'Fetching Leetcode Submissions....',
  ];

  constructor(private profileService: ProfileService, private authService:AuthService) {}
  ngOnInit() {
    this.user = this.authService.getUser.value;
    this.authService.getUser.subscribe((user) => {
      this.user = user;
    }) ;
    this.profileService.getStreak().subscribe(
      (response) => {
        this.streakData = response;
        this.joinedMonth = new Date(this.streakData.joinedAt).getMonth();
      },
      (error) => console.error(JSON.stringify(error))
    );
  }
  getMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString(
      'default',
      { month: 'long' }
    );
  }

  getDaysInMonth(): any[] {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    const grid: any[] = [];

    let currentDay = 1;
    for (let i = 0; i < 6; i++) {
      const row: any[] = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || currentDay > daysInMonth) {
          row.push(null);
        } else {
          row.push(new Date(this.currentYear, this.currentMonth, currentDay));
          currentDay++;
        }
      }
      grid.push(row);
    }
    return grid;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  isStreak(date: Date): boolean {
    if (
      !this.streakData ||
      this.streakData.targetCommits === undefined ||
      this.streakData.targetSubmssions === undefined
    ) {
      return false;
    }

    let leeCount = 0;
    let gitCount = 0;

    const isSameDate = (d1: Date | string, d2: Date): boolean => {
      const date1 = new Date(d1);
      return (
        date1.getFullYear() === d2.getFullYear() &&
        date1.getMonth() === d2.getMonth() &&
        date1.getDate() === d2.getDate()
      );
    };

    this.streakData.leetcodeStreak.forEach((element) => {
      if (element.recordedAt && isSameDate(element.recordedAt, date)) {
        leeCount += element.todaySubmissions;
      }
    });

    this.streakData.gitStreak.forEach((element) => {
      if (element.recordedAt && isSameDate(element.recordedAt, date)) {
        gitCount += element.todayCommits;
      }
    });

    return (
      gitCount >= this.streakData.targetCommits &&
      leeCount >= this.streakData.targetSubmssions
    );
  }

  isBeforeJoin(date: Date): boolean {

    if (this.user != null && this.user.joinedAt != null) {
      const joinedAt = new Date(this.user.joinedAt.replace(' ', 'T'));

      const givenDate = new Date(date);
      givenDate.setHours(0, 0, 0, 0);
      joinedAt.setHours(0, 0, 0, 0);
    
      return givenDate < joinedAt;
    }
    return false;
  }

  isMissed(date: Date): boolean {
    if (
      !this.streakData ||
      this.streakData.targetCommits === undefined ||
      this.streakData.targetSubmssions === undefined
    ) {
      return false;
    }

    if (date > new Date()) return false;

    let leeCount = 0;
    let gitCount = 0;

    const isSameDate = (d1: Date | string, d2: Date): boolean => {
      const date1 = new Date(d1);
      return (
        date1.getFullYear() === d2.getFullYear() &&
        date1.getMonth() === d2.getMonth() &&
        date1.getDate() === d2.getDate()
      );
    };

    this.streakData.leetcodeStreak.forEach((element) => {
      if (element.recordedAt && isSameDate(element.recordedAt, date)) {
        leeCount += element.todaySubmissions;
      }
    });

    this.streakData.gitStreak.forEach((element) => {
      if (element.recordedAt && isSameDate(element.recordedAt, date)) {
        gitCount += element.todayCommits;
      }
    });

    return (
      gitCount < this.streakData.targetCommits ||
      leeCount < this.streakData.targetSubmssions
    );
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  getCurrentStreak() {
    return 0;
  }

  getMaxStreak() {
    return 0;
  }

  isToday(day: Date): boolean {
    const today = new Date();
    return (
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
    );
  }
}
