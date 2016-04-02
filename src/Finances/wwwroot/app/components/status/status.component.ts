import {Component} from "angular2/core";

declare var classie;

@Component({
    selector: "status",
    templateUrl: "app/components/status/status.html"
})
export class StatusComponent {
    currentDate = new Date();
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentDay = this.days[this.currentDate.getDay()];
    currentMonth = this.months[this.currentDate.getMonth()];
}