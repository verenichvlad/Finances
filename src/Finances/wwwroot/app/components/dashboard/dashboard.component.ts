import {Component} from "angular2/core";
import {HttpService} from './../../services/http.service';
import {DateService} from './../../services/date.service';
import {CHART_DIRECTIVES} from '../charts/charts.ts';
import {BaseChart, Charts} from "../charts/charts";

@Component({
    selector: "dashboard",
    templateUrl: "app/components/dashboard/dashboard.html",
    providers: [HttpService, DateService],
    directives: [BaseChart, Charts]
})
export class DashboardComponent {
    responce: string;
    apiControllerName: string = 'dashboard';
    
    constructor(private _httpServ: HttpService, private _dateServ : DateService) { }

    onGetPosts() {
        this._httpServ.getPosts(this.apiControllerName)
            .subscribe(responce => this.responce = responce);
    }

    onPost(title: string, body: string) {
        this._httpServ.createPost(this.apiControllerName, null)
            .subscribe(resp => this.responce = resp);
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