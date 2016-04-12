System.register(['angular2/core', 'angular2/common'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1;
    var Charts, BaseChart, CHART_DIRECTIVES;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            Charts = (function () {
                function Charts(element) {
                }
                Charts = __decorate([
                    core_1.Component({
                        selector: 'chart, canvas[chart]',
                        template: "<canvas></canvas>",
                        directives: [common_1.CORE_DIRECTIVES, common_1.NgClass]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], Charts);
                return Charts;
            })();
            exports_1("Charts", Charts);
            BaseChart = (function () {
                function BaseChart(element) {
                    this.element = element;
                    this._data = [];
                    this.labels = [];
                    this.options = { responsive: true };
                    this.series = [];
                    this.colours = [];
                    this.initFlag = false;
                    this.chartClick = new core_1.EventEmitter();
                    this.chartHover = new core_1.EventEmitter();
                    this.defaultsColours = [
                        {
                            fillColor: 'rgba(151,187,205,0.2)',
                            strokeColor: 'rgba(151,187,205,1)',
                            pointColor: 'rgba(151,187,205,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(151,187,205,0.8)',
                            color: 'rgba(151,187,205,1)',
                            highlight: 'rgba(151,187,205,0.8)'
                        }, {
                            fillColor: 'rgba(220,220,220,0.2)',
                            strokeColor: 'rgba(220,220,220,1)',
                            pointColor: 'rgba(220,220,220,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(220,220,220,0.8)',
                            color: 'rgba(220,220,220,1)',
                            highlight: 'rgba(220,220,220,0.8)'
                        }, {
                            fillColor: 'rgba(247,70,74,0.2)',
                            strokeColor: 'rgba(247,70,74,1)',
                            pointColor: 'rgba(247,70,74,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(247,70,74,0.8)',
                            color: 'rgba(247,70,74,1)',
                            highlight: 'rgba(247,70,74,0.8)'
                        }, {
                            fillColor: 'rgba(70,191,189,0.2)',
                            strokeColor: 'rgba(70,191,189,1)',
                            pointColor: 'rgba(70,191,189,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(70,191,189,0.8)',
                            color: 'rgba(70,191,189,1)',
                            highlight: 'rgba(70,191,189,0.8)'
                        }, {
                            fillColor: 'rgba(253,180,92,0.2)',
                            strokeColor: 'rgba(253,180,92,1)',
                            pointColor: 'rgba(253,180,92,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(253,180,92,0.8)',
                            color: 'rgba(253,180,92,1)',
                            highlight: 'rgba(253,180,92,0.8)'
                        }, {
                            fillColor: 'rgba(148,159,177,0.2)',
                            strokeColor: 'rgba(148,159,177,1)',
                            pointColor: 'rgba(148,159,177,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(148,159,177,0.8)',
                            color: 'rgba(148,159,177,1)',
                            highlight: 'rgba(148,159,177,0.8)'
                        }, {
                            fillColor: 'rgba(77,83,96,0.2)',
                            strokeColor: 'rgba(77,83,96,1)',
                            pointColor: 'rgba(77,83,96,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(77,83,96,0.8)',
                            color: 'rgba(77,83,96,1)',
                            highlight: 'rgba(77,83,96,0.8)'
                        }];
                }
                BaseChart.prototype.ngOnInit = function () {
                    this.ctx = this.element.nativeElement.children[0].getContext('2d');
                    this.cvs = this.element.nativeElement.children[0];
                    this.parent = this.element.nativeElement;
                    this.refresh();
                    this.initFlag = true;
                };
                BaseChart.prototype.ngOnDestroy = function () {
                    if (this.chart) {
                        this.chart.destroy();
                        this.chart = null;
                    }
                    if (this.legendTemplate) {
                        this.legendTemplate.destroy();
                        this.legendTemplate = null;
                    }
                };
                Object.defineProperty(BaseChart.prototype, "data", {
                    get: function () {
                        return this._data;
                    },
                    set: function (value) {
                        this._data = value;
                        if (this.initFlag && this._data && this._data.length > 0) {
                            this.refresh();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BaseChart.prototype, "chartType", {
                    get: function () {
                        return this._chartType;
                    },
                    set: function (value) {
                        this._chartType = value;
                        if (this.initFlag && this._chartType && this._chartType.length > 0) {
                            this.refresh();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                BaseChart.prototype.setLegend = function () {
                    var list = this.parent.getElementsByTagName('ul');
                    if (list.length) {
                        list[0].remove();
                        this.parent.insertAdjacentHTML('beforeend', this.chart.generateLegend());
                    }
                    else {
                        this.parent.insertAdjacentHTML('beforeend', this.chart.generateLegend());
                    }
                };
                BaseChart.prototype.getColour = function (colour) {
                    return {
                        fillColor: this.rgba(colour, 0.2),
                        strokeColor: this.rgba(colour, 1),
                        pointColor: this.rgba(colour, 1),
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: this.rgba(colour, 0.8),
                        color: this.rgba(colour, 1),
                        highlight: this.rgba(colour, 0.8)
                    };
                };
                BaseChart.prototype.getRandomInt = function (min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                };
                BaseChart.prototype.rgba = function (colour, alpha) {
                    return 'rgba(' + colour.concat(alpha).join(',') + ')';
                };
                BaseChart.prototype.click = function (evt) {
                    var atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
                    var activePoints = atEvent.call(this.chart, evt);
                    if (activePoints.length > 0) {
                        var activeLabel = activePoints[0].label;
                        this.chartClick.emit({ activePoints: activePoints, activeLabel: activeLabel });
                    }
                    else {
                        console.log('not point');
                    }
                };
                BaseChart.prototype.hover = function (evt) {
                    var atEvent = this.chart.getPointsAtEvent || this.chart.getBarsAtEvent || this.chart.getSegmentsAtEvent;
                    var activePoints = atEvent.call(this.chart, evt);
                    if (activePoints.length > 0) {
                        var activeLabel = activePoints[0].label;
                        var activePoint = activePoints[0].value;
                        this.chartHover.emit({ activePoints: activePoints, activePoint: activePoint, activeLabel: activeLabel });
                    }
                    else {
                        console.log('not point');
                    }
                };
                BaseChart.prototype.getChartBuilder = function (ctx, data, options) {
                    return new Chart(ctx)[this.chartType](data, options);
                };
                BaseChart.prototype.getDataObject = function (label, value) {
                    if (this.chartType === 'Line'
                        || this.chartType === 'Bar'
                        || this.chartType === 'Radar') {
                        return {
                            label: label,
                            data: value
                        };
                    }
                    if (this.chartType === 'Pie'
                        || this.chartType === 'Doughnut'
                        || this.chartType === 'PolarArea') {
                        return {
                            label: label,
                            value: value
                        };
                    }
                    return null;
                };
                BaseChart.prototype.getChartData = function (labels, dataObject) {
                    if (this.chartType === 'Line'
                        || this.chartType === 'Bar'
                        || this.chartType === 'Radar') {
                        return {
                            labels: labels,
                            datasets: dataObject
                        };
                    }
                    if (this.chartType === 'Pie'
                        || this.chartType === 'Doughnut'
                        || this.chartType === 'PolarArea') {
                        return dataObject;
                    }
                };
                BaseChart.prototype.refresh = function () {
                    this.ngOnDestroy();
                    var dataset = [];
                    for (var i = 0; i < this.data.length; i++) {
                        var colourDesc = [this.getRandomInt(0, 255), this.getRandomInt(0, 255), this.getRandomInt(0, 255)];
                        var colour = i < this.colours.length ? this.colours[i] : this.defaultsColours[i] || this.getColour(colourDesc);
                        var data_1 = Object.assign(colour, this.getDataObject(this.series[i] || this.labels[i], this.data[i]));
                        dataset.push(data_1);
                    }
                    var data = this.getChartData(this.labels, dataset);
                    this.chart = this.getChartBuilder(this.ctx, data, this.options);
                    if (this.legend) {
                        this.setLegend();
                    }
                };
                BaseChart = __decorate([
                    core_1.Component({
                        selector: 'base-chart',
                        properties: [
                            'data',
                            'labels',
                            'series',
                            'colours',
                            'chartType',
                            'legend',
                            'options'
                        ],
                        events: ['chartClick', 'chartHover'],
                        template: "\n  <canvas style=\"width: 100%; height: 100%;\" (click)=\"click($event)\" (mousemove)=\"hover($event)\"></canvas>\n  ",
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, common_1.NgClass]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BaseChart);
                return BaseChart;
            })();
            exports_1("BaseChart", BaseChart);
            exports_1("CHART_DIRECTIVES", CHART_DIRECTIVES = [Charts, BaseChart]);
        }
    }
});
//# sourceMappingURL=charts.js.map