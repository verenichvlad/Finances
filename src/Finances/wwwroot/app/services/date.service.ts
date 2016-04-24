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
}