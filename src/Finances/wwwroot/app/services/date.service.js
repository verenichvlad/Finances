System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var DateService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DateService = (function () {
                function DateService() {
                    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                }
                DateService.prototype.getDayName = function (date) {
                    if (!date) {
                        return this.days[new Date().getDay()];
                    }
                    else {
                        return this.days[date.getDay()];
                    }
                };
                DateService.prototype.getMonthName = function (date) {
                    if (!date) {
                        return this.days[new Date().getMonth()];
                    }
                    else {
                        return this.days[date.getMonth()];
                    }
                };
                DateService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], DateService);
                return DateService;
            })();
            exports_1("DateService", DateService);
        }
    }
});
//# sourceMappingURL=date.service.js.map