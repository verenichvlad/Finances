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
}