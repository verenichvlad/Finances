import {Injectable} from 'angular2/core';

@Injectable()
export class DateService {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    getDayName(date: Date): string {
        if (!date) {
            return this.days[new Date().getDay()];
        } else {
            return this.days[date.getDay()];
        }
    }
    getMonthName(date: Date): string {
        if (!date) {
            return this.days[new Date().getMonth()];
        } else {
            return this.days[date.getMonth()];
        }
    }

    getDaysAmountInMonth(month : number, year : number, isZeroBased : boolean) : number {
        if(isZeroBased) --month;
        return new Date(year, month, 0).getDate();
    }

    getDaysAmountInCurrentMonth() : number {
        var d = new Date();
        return new Date(d.getMonth(), d.getFullYear(), 0).getDate();
    }

    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

     rangeWeek (dateStr) {
        if (!dateStr) dateStr = new Date().getTime();
        var dt = new Date(dateStr);
        dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        dt = new Date(dt.getTime() - (dt.getDay() > 0 ? (dt.getDay() - 1) * 1000 * 60 * 60 * 24 : 6 * 1000 * 60 * 60 * 24));
        return { start: dt, end: new Date(dt.getTime() + 1000 * 60 * 60 * 24 * 7 - 1) };
    }

    rangeCurrentMonth() {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        return {start: firstDay, end: lastDay};
    }

    getCurrentMonthWeekSpans() {
        var spans = [];

        var monthStart = this.rangeCurrentMonth().start;
        var currentWeekRange = this.rangeWeek(monthStart);
        do {
            spans.push(currentWeekRange);
            currentWeekRange = this.rangeWeek(this.addDays(currentWeekRange.end, 1));
        }
        while (currentWeekRange.start <= this.rangeCurrentMonth().end);

        return spans;
    }
}