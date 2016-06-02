import {Component, OnInit} from "angular2/core";
import {HttpService} from './../../services/http.service';
import {DateService} from './../../services/date.service';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
    selector: "dashboard",
    templateUrl: "app/components/dashboard/dashboard.html",
    providers: [HttpService, DateService],
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class DashboardComponent implements OnInit{
    private choosenStartDate : Date;
    private showDayView : boolean;
    private showWeekView :boolean;
    private showMonthView :boolean;
    private allExpances;
    private currentExpances;
    private dailyMax;
    private currentExpancesSum;
    private allTags;
    private currentTags = [];
    private isLoading;
    private showInfo;
    private filterDaily = true;

    private apiControllerName: string = 'dashboard';
    
    constructor(private _httpServ: HttpService, private _dateServ : DateService) {
        this.choosenStartDate = new Date();
    }

    ngOnInit():any {
        this.onGetTags();
        this.onGetExpancesData();
    }

    onGetTags() {
        this.isLoading = true;
        this._httpServ.getPosts('tags')
            .subscribe(responce => {
                this.allTags = responce;
                this.isLoading = false;
                this.setDailyMax();
            });
    }

    onGetExpancesData() {
        this._httpServ.getPosts(this.apiControllerName + '/expances')
            .subscribe(resp => {
                this.allExpances = resp;
                for(var transaction of this.allExpances) {
                    transaction.creationDate = new Date(Date.parse(transaction.creationDate));
                }
                this.loadView('day', null);
            });
    }

    loadView(panelName : string, date : any) {
        this.showDayView = this.showWeekView = this.showMonthView = false;

        switch(panelName) {
            case "day":
                this.showDayView = true;
                if(!date) {
                    this.FilterAllExpancesByDate(new Date(), new Date());
                    this.choosenStartDate = new Date();
                }
                else {
                    this.choosenStartDate = date;
                    this.FilterAllExpancesByDate(date, date);
                }
                if(this.filterDaily)
                    this.FilterCurrentExpancesByShowDaily();

                this.setCurrentExpancesSum();
                break;
            case "week":
                this.showWeekView = true;
                if(!date) {
                    this.FilterAllExpancesByDate(this._dateServ.rangeWeek(null).start, this._dateServ.rangeWeek(null).end);
                    this.choosenStartDate = new Date();
                }
                else {
                    this.FilterAllExpancesByDate(date.start, date.end);
                    this.choosenStartDate = date.start;
                }

                this.setCurrentExpancesSum();
                this.setWeekBarData();
                this.setCurrentTags();
                this.setDoughnutChartData();
                break;
            case "month":
                this.showMonthView = true;
                this.FilterAllExpancesByDate(this._dateServ.getCurrentMonthWeekSpans()[0].start, this._dateServ.getCurrentMonthWeekSpans().slice(-1)[0].end);
                this.setCurrentExpancesSum();
                this.setCurrentTags();
                this.setPieChartData();
                this.setPolarChartData();
                break;
            default: this.showDayView = true; break;
        }
    }

    showDailyChanged(cb) {
        this.filterDaily = cb.checked;
        this.loadView('day', this.choosenStartDate);
    }

    setDailyMax() {
        var tags = this.allTags.filter(function(tag){
            return tag.showOnDailyStats;
        });

        var sumTags = 0;

        for(var i = 0; i < tags.length; i++) {
            sumTags += tags[i].monthLimit;
        }

        this.dailyMax = sumTags / 30;
    }

    getExpancesSumForDay(date : Date) {
        var expances = this.currentExpances.filter(function(exp){
            return exp.creationDate.setHours(0,0,0,0) == date.setHours(0,0,0,0);
        });

        if(!expances || expances.length < 1) return 0;

        var sum = 0;

        for(var i = 0; i < expances.length; i++) {
            sum += Math.abs(Math.round(expances[i].amount));
        }
        return sum;
    }

    getDaysInMonth() {
        var d = new Date(this.choosenStartDate.getFullYear(), this.choosenStartDate.getMonth()+1, 0);
        return d.getDate();
    }

    setCurrentExpancesSum() {
        var sum = 0;

        for(var i = 0;i < this.currentExpances.length; i++) {
            sum += Math.abs(this.currentExpances[i].amount);
        }
        this.currentExpancesSum = sum;
    }

    setCurrentTags() {
        var exp = this.currentExpances;
        for (var i = 0; i < exp.length; i++) {
            if (exp[i].tags && exp[i].tags.length > 0) {
                for(var j = 0; j < exp[i].tags.length; j++) {
                    if (this.currentTags.length === 0 || this.currentTags.filter(function(tag){return tag.id === exp[i].tags[j].id}).length === 0) {
                        this.currentTags.push(this.currentExpances[i].tags[j]);
                    }
                }
            }
        }
    }

    private FilterAllExpancesByDate(startDate : Date, endDate : Date) {
        this.currentExpances = this.allExpances.filter(function (exp) {
            return exp.creationDate.setHours(0,0,0,0) >= startDate.setHours(0,0,0,0)
                && exp.creationDate.setHours(0,0,0,0) <= endDate.setHours(0,0,0,0);
        });
    }

    private FilterCurrentExpancesByShowDaily(){
        if(this.currentExpances)
        this.currentExpances = this.currentExpances.filter(function (exp) {
            if(exp.tags && exp.tags.filter(function (tag) {
                return tag.showOnDailyStats;
                }).length > 0) return true;
        });
    }


    getExpancesSumForWeek(start : Date, end : Date) {
        var expances = this.currentExpances.filter(function(exp){
            return exp.creationDate.setHours(0,0,0,0) >= start.setHours(0,0,0,0) && exp.creationDate.setHours(0,0,0,0) <= end.setHours(0,0,0,0);
        });

        if(!expances || expances.length < 1) return 0;

        var sum = 0;

        for(var i = 0; i < expances.length; i++) {
            sum += Math.abs(expances[i].amount);
        }
        return sum;
    }

    getExpancesSumForTag(id : number) : number {
        var expancesSum : number = 0;
        var expances = this.currentExpances.filter(function(exp) {
            if(exp.tags) {
                return exp.tags.filter(function (tag) {
                        return tag.id === id;
                    }).length > 0}
            else return false;
            });

        for(var i = 0; i < expances.length; i++) {
            expancesSum += expances[i].amount;
        }

        return expancesSum;
    }






    activeWeekBarLabelToDate(lbl) : Date {
        var weekStart = this._dateServ.rangeWeek(null).start;
        switch (lbl) {
            case 'Monday': return this._dateServ.addDays(weekStart, 0);
            case 'Tuesday': return this._dateServ.addDays(weekStart, 1);
            case 'Wednesday': return this._dateServ.addDays(weekStart, 2);
            case 'Thursday': return this._dateServ.addDays(weekStart, 3);
            case 'Friday': return this._dateServ.addDays(weekStart, 4);
            case 'Saturday': return this._dateServ.addDays(weekStart, 5);
            case 'Sunday': return this._dateServ.addDays(weekStart, 6);
        }
    }

    activeMonthChartLabelToDate(lbl) {
        switch (lbl) {
            case 'Week 1': return this._dateServ.getCurrentMonthWeekSpans()[0];
            case 'Week 2': return this._dateServ.getCurrentMonthWeekSpans()[1];
            case 'Week 3': return this._dateServ.getCurrentMonthWeekSpans()[2];
            case 'Week 4': return this._dateServ.getCurrentMonthWeekSpans()[3];
            case 'Week 5': return this._dateServ.getCurrentMonthWeekSpans()[4];
        }
    }

    setWeekBarData() {
       var weekStart = this._dateServ.rangeWeek(this.choosenStartDate).start;
       this.weekBarChartData = [
            [
                this.getExpancesSumForDay(this._dateServ.addDays(weekStart, 0)),
                this.getExpancesSumForDay(this._dateServ.addDays(weekStart, 1)),
                this.getExpancesSumForDay(this._dateServ.addDays(weekStart, 2)),
                this.getExpancesSumForDay(this._dateServ.addDays(weekStart, 3)),
                this.getExpancesSumForDay(this._dateServ.addDays(weekStart, 4)),
                this.getExpancesSumForDay(this._dateServ.addDays(weekStart, 5)),
                this.getExpancesSumForDay(this._dateServ.addDays(weekStart, 6))
            ]
        ];
    }

    setDoughnutChartData() {
        this.doughnutChartData = [];
        this.doughnutChartLabels = [];

        for(var i = 0; i < this.currentTags.length; i++) {
            this.doughnutChartLabels.push(this.currentTags[i].title);
            this.doughnutChartData.push(this.getExpancesSumForTag(this.currentTags[i].id));
        }
    }

    setPolarChartData() {
        this.polarAreaChartLabels = [];
        this.polarAreaChartData = [];

        for(var i = 0; i < this.currentTags.length; i++) {
            this.polarAreaChartLabels.push(this.currentTags[i].title);
            this.polarAreaChartData.push(this.getExpancesSumForTag(this.currentTags[i].id));
        }
    }

    setPieChartData() {
        this.pieChartData = [];
        this.pieChartLabels = [];
        var spans = this._dateServ.getCurrentMonthWeekSpans();


        for(var i = 0; i < spans.length; i++) {
            this.pieChartLabels.push('Week ' + (i + 1));
            this.pieChartData.push(this.getExpancesSumForWeek(spans[i].start, spans[i].end));
        }
    }

    private barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
    };

    private barChartSeries = ['Series A'];
    public barChartType = 'Bar';


    private weekBarChartData = [[]];
    private weekBarChartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'Doughnut';


    // events
    public weekBarChartClicked(e:any):void {
        this.loadView('day', this.activeWeekBarLabelToDate(e.activeLabel));
    }

    public pieChartClicked(e:any):void {
        this.loadView('week', this.activeMonthChartLabelToDate(e.activeLabel));
    }

    public chartHovered(e:any):void {
    }
    public chartHovered2(e:any):void {
    }
    public chartHovered3(e:any):void {
    }
    public chartHovered4(e:any):void {
    }
    public chartClicked(e:any):void {
    }

    public pieChartLabels:string[] = [];
    public pieChartData:number[] = [];
    public pieChartType:string = 'Pie';

    public polarAreaChartLabels:string[] = [];
    public polarAreaChartData:number[] = [];
    public polarAreaLegend:boolean = true;

    public polarAreaChartType:string = 'PolarArea';

}