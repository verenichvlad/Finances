System.register(["angular2/core", './../../services/http.service', './../../services/date.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_service_1, date_service_1;
    var StatusComponent;
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
            }],
        execute: function() {
            StatusComponent = (function () {
                function StatusComponent(_httpServ, _dateServ) {
                    this._httpServ = _httpServ;
                    this._dateServ = _dateServ;
                    this.currentDay = this._dateServ.getDayName(null);
                }
                StatusComponent.prototype.onGetPosts = function () {
                    var _this = this;
                    this._httpServ.getPosts()
                        .subscribe(function (responce) { return _this.responce = responce; });
                };
                StatusComponent.prototype.onPost = function (title, body) {
                    var _this = this;
                    this._httpServ.createPost({ title: title, body: body })
                        .subscribe(function (resp) { return _this.responce = resp; });
                };
                StatusComponent = __decorate([
                    core_1.Component({
                        selector: "status",
                        templateUrl: "app/components/status/status.html",
                        providers: [http_service_1.HttpService, date_service_1.DateService]
                    }), 
                    __metadata('design:paramtypes', [http_service_1.HttpService, date_service_1.DateService])
                ], StatusComponent);
                return StatusComponent;
            })();
            exports_1("StatusComponent", StatusComponent);
        }
    }
});
//# sourceMappingURL=status.component.js.map