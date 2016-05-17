System.register(["angular2/core", './../../services/http.service', './../../services/date.service', 'angular2/common', 'ng2-charts/ng2-charts'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_service_1, date_service_1, common_1, ng2_charts_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (date_service_1_1) {
                date_service_1 = date_service_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (ng2_charts_1_1) {
                ng2_charts_1 = ng2_charts_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(_httpServ, _dateServ) {
                    this._httpServ = _httpServ;
                    this._dateServ = _dateServ;
                    this.apiControllerName = 'dashboard';
                    this.barChartOptions = {
                        scaleShowVerticalLines: false,
                        responsive: true,
                        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
                    };
                    this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
                    this.barChartSeries = ['Series A', 'Series B'];
                    this.barChartType = 'Bar';
                    this.barChartLegend = true;
                    this.barChartData = [
                        [65, 59, 80, 81, 56, 55, 40],
                        [28, 48, 40, 19, 86, 27, 90]
                    ];
                    this.choosenStartDate = new Date();
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    this.onGetDailyMax();
                    this.onGetExpancesData();
                };
                DashboardComponent.prototype.onGetExpancesData = function () {
                    var _this = this;
                    this._httpServ.getPosts(this.apiControllerName + '/expances')
                        .subscribe(function (resp) {
                        if (_this.checkResponce(resp))
                            _this.allExpances = resp;
                    });
                };
                DashboardComponent.prototype.onGetDailyMax = function () {
                    var _this = this;
                    this._httpServ.getPosts(this.apiControllerName + '/dailyMax')
                        .subscribe(function (resp) {
                        if (_this.checkResponce(resp))
                            _this.dailyMax = resp;
                    });
                };
                DashboardComponent.prototype.onPost = function (title, body) {
                    var _this = this;
                    this._httpServ.createPost(this.apiControllerName, null)
                        .subscribe(function (resp) { _this.checkResponce(resp); });
                };
                DashboardComponent.prototype.FilterExpancesByDate = function (startDate, endDate) {
                    this.currentExpances = this.allExpances.filter(function (exp) {
                        return exp.creationDate >= startDate && exp.creationDate <= endDate;
                    });
                };
                DashboardComponent.prototype.FilterCurrentExpancesByShowDaily = function () {
                    this.currentExpances = this.currentExpances.filter(function (exp) {
                        if (exp.filter(function (tag) {
                            return tag.showOnDailyStats;
                        }).length > 0)
                            return true;
                    });
                };
                DashboardComponent.prototype.getExpancesSum = function () {
                    var sum = 0;
                    for (var expance in this.currentExpances) {
                        sum += expance.amount;
                    }
                    return sum;
                };
                DashboardComponent.prototype.onShowPanel = function (panelName) {
                    this.hidePanels();
                    switch (panelName) {
                        case "day":
                            this.showDayView = true;
                            this.FilterExpancesByDate(new Date(), new Date());
                            this.FilterCurrentExpancesByShowDaily();
                            break;
                        case "week":
                            this.showWeekView = true;
                            this.FilterExpancesByDate(this._dateServ.rangeWeek(null).start, this._dateServ.rangeWeek(null).end);
                            break;
                        case "month":
                            this.showMonthView = true;
                            break;
                        case "year":
                            this.showYearView = true;
                            break;
                        default:
                            this.showDayView = true;
                            break;
                    }
                };
                DashboardComponent.prototype.hidePanels = function () {
                    this.showDayView = this.showWeekView = this.showMonthView = this.showYearView = false;
                };
                DashboardComponent.prototype.checkResponce = function (r) {
                    return true;
                };
                // events
                DashboardComponent.prototype.chartClicked = function (e) {
                    console.log(e);
                };
                DashboardComponent.prototype.chartHovered = function (e) {
                    console.log(e);
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: "dashboard",
                        templateUrl: "app/components/dashboard/dashboard.html",
                        providers: [http_service_1.HttpService, date_service_1.DateService],
                        directives: [ng2_charts_1.CHART_DIRECTIVES, common_1.NgClass, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [http_service_1.HttpService, date_service_1.DateService])
                ], DashboardComponent);
                return DashboardComponent;
            })();
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map