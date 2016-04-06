System.register(["angular2/core", './../../services/http.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_service_1;
    var SettingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            }],
        execute: function() {
            SettingsComponent = (function () {
                function SettingsComponent(_httpServ) {
                    this._httpServ = _httpServ;
                    this._apiControllerName = 'settings';
                }
                SettingsComponent.prototype.onGetPosts = function () {
                    var _this = this;
                    this._httpServ.getPosts(this._apiControllerName)
                        .subscribe(function (responce) { return _this._responce = responce; });
                };
                SettingsComponent.prototype.onPost = function (title, body) {
                    var _this = this;
                    this._httpServ.createPost(this._apiControllerName, { title: title, body: body })
                        .subscribe(function (resp) { return _this._responce = resp; });
                };
                SettingsComponent = __decorate([
                    core_1.Component({
                        selector: "settings",
                        templateUrl: "app/components/settings/settings.html",
                        providers: [http_service_1.HttpService]
                    }), 
                    __metadata('design:paramtypes', [http_service_1.HttpService])
                ], SettingsComponent);
                return SettingsComponent;
            })();
            exports_1("SettingsComponent", SettingsComponent);
        }
    }
});
//# sourceMappingURL=settings.component.js.map