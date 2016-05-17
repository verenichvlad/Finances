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
    private showYearView :boolean;
    private allExpances;
    private currentExpances;
    private dailyMax;

    private apiControllerName: string = 'dashboard';
    
    constructor(private _httpServ: HttpService, private _dateServ : DateService) {
        this.choosenStartDate = new Date();
    }

    ngOnInit():any {
        this.onGetDailyMax();
        this.onGetExpancesData();
    }

    onGetExpancesData() {
        this._httpServ.getPosts(this.apiControllerName + '/expances')
            .subscribe(resp => {
                if(this.checkResponce(resp))
                    this.allExpances = resp;
            });
    }

    onGetDailyMax() {
        this._httpServ.getPosts(this.apiControllerName + '/dailyMax')
            .subscribe(resp => {
                if(this.checkResponce(resp))
                    this.dailyMax = resp;
            });
    }

    onPost(title: string, body: string) {
        this._httpServ.createPost(this.apiControllerName, null)
            .subscribe(resp => {this.checkResponce(resp)});
    }

    private FilterExpancesByDate(startDate : Date, endDate : Date) {
        this.currentExpances = this.allExpances.filter(function (exp) {
            return exp.creationDate >= startDate && exp.creationDate <= endDate;
        });
    }

    private FilterCurrentExpancesByShowDaily(){
        this.currentExpances = this.currentExpances.filter(function (exp) {
            if(exp.filter(function (tag) {
                return tag.showOnDailyStats;
                }).length > 0) return true;
        });
    }

    getExpancesSum() :number {
        var sum = 0;

        for(var expance in this.currentExpances) {
            sum += expance.amount;
        }

        return sum;
    }

    onShowPanel(panelName : string) {
        this.hidePanels();
        switch(panelName) {
            case "day": this.showDayView = true; this.FilterExpancesByDate(new Date(), new Date());
                this.FilterCurrentExpancesByShowDaily();break;
            case "week": this.showWeekView = true;
                this.FilterExpancesByDate(this._dateServ.rangeWeek(null).start, this._dateServ.rangeWeek(null).end);
                break;
            case "month": this.showMonthView = true; break;
            case "year": this.showYearView = true; break;
            default: this.showDayView = true; break;
        }
    }

    private hidePanels() : void {
        this.showDayView = this.showWeekView = this.showMonthView = this.showYearView = false;
    }

    private checkResponce(r) {
        return true;
    }

    private barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
    };
    private barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    private barChartSeries = ['Series A', 'Series B'];
    public barChartType = 'Bar';
    private barChartLegend:boolean = true;

    private barChartData = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];

    // events
    chartClicked(e:any) {
        console.log(e);
    }
    chartHovered(e:any) {
        console.log(e);
    }
}