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
                    this.currentTags = [];
                    this.filterDaily = true;
                    this.apiControllerName = 'dashboard';
                    this.barChartOptions = {
                        scaleShowVerticalLines: false,
                        responsive: true,
                        multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
                    };
                    this.barChartSeries = ['Series A'];
                    this.barChartType = 'Bar';
                    this.weekBarChartData = [[]];
                    this.weekBarChartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    this.doughnutChartLabels = [];
                    this.doughnutChartData = [];
                    this.doughnutChartType = 'Doughnut';
                    this.pieChartLabels = [];
                    this.pieChartData = [];
                    this.pieChartType = 'Pie';
                    this.polarAreaChartLabels = [];
                    this.polarAreaChartData = [];
                    this.polarAreaLegend = true;
                    this.polarAreaChartType = 'PolarArea';
                    this.choosenStartDate = new Date();
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    this.onGetTags();
                    this.onGetExpancesData();
                };
                DashboardComponent.prototype.onGetTags = function () {
                    var _this = this;
                    this.isLoading = true;
                    this._httpServ.getPosts('tags')
                        .subscribe(function (responce) {
                        _this.allTags = responce;
                        _this.isLoading = false;
                        _this.setDailyMax();
                    });
                };
                DashboardComponent.prototype.onGetExpancesData = function () {
                    var _this = this;
                    this._httpServ.getPosts(this.apiControllerName + '/expances')
                        .subscribe(function (resp) {
                        _this.allExpances = resp;
                        for (var _i = 0, _a = _this.allExpances; _i < _a.length; _i++) {
                            var transaction = _a[_i];
                            transaction.creationDate = new Date(Date.parse(transaction.creationDate));
                        }
                        _this.loadView('day', null);
                    });
                };
                DashboardComponent.prototype.loadView = function (panelName, date) {
                    this.showDayView = this.showWeekView = this.showMonthView = false;
                    switch (panelName) {
                        case "day":
                            this.showDayView = true;
                            if (!date) {
                                this.FilterAllExpancesByDate(new Date(), new Date());
                                this.choosenStartDate = new Date();
                            }
                            else {
                                this.choosenStartDate = date;
                                this.FilterAllExpancesByDate(date, date);
                            }
                            if (this.filterDaily)
                                this.FilterCurrentExpancesByShowDaily();
                            this.setCurrentExpancesSum();
                            break;
                        case "week":
                            this.showWeekView = true;
                            if (!date) {
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
                        default:
                            this.showDayView = true;
                            break;
                    }
                };
                DashboardComponent.prototype.showDailyChanged = function (cb) {
                    this.filterDaily = cb.checked;
                    this.loadView('day', this.choosenStartDate);
                };
                DashboardComponent.prototype.setDailyMax = function () {
                    var tags = this.allTags.filter(function (tag) {
                        return tag.showOnDailyStats;
                    });
                    var sumTags = 0;
                    for (var i = 0; i < tags.length; i++) {
                        sumTags += tags[i].monthLimit;
                    }
                    this.dailyMax = sumTags / 30;
                };
                DashboardComponent.prototype.getExpancesSumForDay = function (date) {
                    var expances = this.currentExpances.filter(function (exp) {
                        return exp.creationDate.setHours(0, 0, 0, 0) == date.setHours(0, 0, 0, 0);
                    });
                    if (!expances || expances.length < 1)
                        return 0;
                    var sum = 0;
                    for (var i = 0; i < expances.length; i++) {
                        sum += Math.abs(Math.round(expances[i].amount));
                    }
                    return sum;
                };
                DashboardComponent.prototype.getDaysInMonth = function () {
                    var d = new Date(this.choosenStartDate.getFullYear(), this.choosenStartDate.getMonth() + 1, 0);
                    return d.getDate();
                };
                DashboardComponent.prototype.setCurrentExpancesSum = function () {
                    var sum = 0;
                    for (var i = 0; i < this.currentExpances.length; i++) {
                        sum += Math.abs(this.currentExpances[i].amount);
                    }
                    this.currentExpancesSum = sum;
                };
                DashboardComponent.prototype.setCurrentTags = function () {
                    var exp = this.currentExpances;
                    for (var i = 0; i < exp.length; i++) {
                        if (exp[i].tags && exp[i].tags.length > 0) {
                            for (var j = 0; j < exp[i].tags.length; j++) {
                                if (this.currentTags.length === 0 || this.currentTags.filter(function (tag) { return tag.id === exp[i].tags[j].id; }).length === 0) {
                                    this.currentTags.push(this.currentExpances[i].tags[j]);
                                }
                            }
                        }
                    }
                };
                DashboardComponent.prototype.FilterAllExpancesByDate = function (startDate, endDate) {
                    this.currentExpances = this.allExpances.filter(function (exp) {
                        return exp.creationDate.setHours(0, 0, 0, 0) >= startDate.setHours(0, 0, 0, 0)
                            && exp.creationDate.setHours(0, 0, 0, 0) <= endDate.setHours(0, 0, 0, 0);
                    });
                };
                DashboardComponent.prototype.FilterCurrentExpancesByShowDaily = function () {
                    if (this.currentExpances)
                        this.currentExpances = this.currentExpances.filter(function (exp) {
                            if (exp.tags && exp.tags.filter(function (tag) {
                                return tag.showOnDailyStats;
                            }).length > 0)
                                return true;
                        });
                };
                DashboardComponent.prototype.getExpancesSumForWeek = function (start, end) {
                    var expances = this.currentExpances.filter(function (exp) {
                        return exp.creationDate.setHours(0, 0, 0, 0) >= start.setHours(0, 0, 0, 0) && exp.creationDate.setHours(0, 0, 0, 0) <= end.setHours(0, 0, 0, 0);
                    });
                    if (!expances || expances.length < 1)
                        return 0;
                    var sum = 0;
                    for (var i = 0; i < expances.length; i++) {
                        sum += Math.abs(expances[i].amount);
                    }
                    return sum;
                };
                DashboardComponent.prototype.getExpancesSumForTag = function (id) {
                    var expancesSum = 0;
                    var expances = this.currentExpances.filter(function (exp) {
                        if (exp.tags) {
                            return exp.tags.filter(function (tag) {
                                return tag.id === id;
                            }).length > 0;
                        }
                        else
                            return false;
                    });
                    for (var i = 0; i < expances.length; i++) {
                        expancesSum += expances[i].amount;
                    }
                    return expancesSum;
                };
                DashboardComponent.prototype.activeWeekBarLabelToDate = function (lbl) {
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
                };
                DashboardComponent.prototype.activeMonthChartLabelToDate = function (lbl) {
                    switch (lbl) {
                        case 'Week 1': return this._dateServ.getCurrentMonthWeekSpans()[0];
                        case 'Week 2': return this._dateServ.getCurrentMonthWeekSpans()[1];
                        case 'Week 3': return this._dateServ.getCurrentMonthWeekSpans()[2];
                        case 'Week 4': return this._dateServ.getCurrentMonthWeekSpans()[3];
                        case 'Week 5': return this._dateServ.getCurrentMonthWeekSpans()[4];
                    }
                };
                DashboardComponent.prototype.setWeekBarData = function () {
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
                };
                DashboardComponent.prototype.setDoughnutChartData = function () {
                    this.doughnutChartData = [];
                    this.doughnutChartLabels = [];
                    for (var i = 0; i < this.currentTags.length; i++) {
                        this.doughnutChartLabels.push(this.currentTags[i].title);
                        this.doughnutChartData.push(this.getExpancesSumForTag(this.currentTags[i].id));
                    }
                };
                DashboardComponent.prototype.setPolarChartData = function () {
                    this.polarAreaChartLabels = [];
                    this.polarAreaChartData = [];
                    for (var i = 0; i < this.currentTags.length; i++) {
                        this.polarAreaChartLabels.push(this.currentTags[i].title);
                        this.polarAreaChartData.push(this.getExpancesSumForTag(this.currentTags[i].id));
                    }
                };
                DashboardComponent.prototype.setPieChartData = function () {
                    this.pieChartData = [];
                    this.pieChartLabels = [];
                    var spans = this._dateServ.getCurrentMonthWeekSpans();
                    for (var i = 0; i < spans.length; i++) {
                        this.pieChartLabels.push('Week ' + (i + 1));
                        this.pieChartData.push(this.getExpancesSumForWeek(spans[i].start, spans[i].end));
                    }
                };
                // events
                DashboardComponent.prototype.weekBarChartClicked = function (e) {
                    this.loadView('day', this.activeWeekBarLabelToDate(e.activeLabel));
                };
                DashboardComponent.prototype.pieChartClicked = function (e) {
                    this.loadView('week', this.activeMonthChartLabelToDate(e.activeLabel));
                };
                DashboardComponent.prototype.chartHovered = function (e) {
                };
                DashboardComponent.prototype.chartHovered2 = function (e) {
                };
                DashboardComponent.prototype.chartHovered3 = function (e) {
                };
                DashboardComponent.prototype.chartHovered4 = function (e) {
                };
                DashboardComponent.prototype.chartClicked = function (e) {
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