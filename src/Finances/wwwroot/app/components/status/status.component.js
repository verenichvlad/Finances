System.register(["angular2/core"], function(exports_1) {
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
    var StatusComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            StatusComponent = (function () {
                function StatusComponent() {
                    this.currentDate = new Date();
                    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    this.currentDay = this.days[this.currentDate.getDay()];
                    this.currentMonth = this.months[this.currentDate.getMonth()];
                }
                StatusComponent = __decorate([
                    core_1.Component({
                        selector: "status",
                        templateUrl: "app/components/status/status.html"
                    }), 
                    __metadata('design:paramtypes', [])
                ], StatusComponent);
                return StatusComponent;
            })();
            exports_1("StatusComponent", StatusComponent);
        }
    }
});
//# sourceMappingURL=status.component.js.map