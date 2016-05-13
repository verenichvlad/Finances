System.register(["angular2/core", "../../services/http.service"], function(exports_1) {
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
    var PlanComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            }],
        execute: function() {
            PlanComponent = (function () {
                function PlanComponent(_httpServ) {
                    this._httpServ = _httpServ;
                    this.tags = [];
                    this.showAddForm = false;
                    this.isLoading = false;
                }
                PlanComponent.prototype.ngOnInit = function () {
                    this.onGetTags();
                };
                PlanComponent.prototype.onGetTags = function () {
                    var _this = this;
                    this.isLoading = true;
                    this._httpServ.getPosts('tags')
                        .subscribe(function (responce) {
                        if (responce)
                            _this.tags = responce;
                        _this.isLoading = false;
                    });
                };
                PlanComponent.prototype.onPostTag = function (tag) {
                    var _this = this;
                    this.isLoading = true;
                    this._httpServ.createPost('tags', tag)
                        .subscribe(function (resp) {
                        _this.onGetTags();
                    });
                };
                PlanComponent.prototype.onRemoveTag = function (id) {
                    var _this = this;
                    this.isLoading = true;
                    this._httpServ.deletePost('tags', id)
                        .subscribe(function (resp) {
                        _this.onGetTags();
                    });
                };
                PlanComponent.prototype.onAddTagSubmit = function (form) {
                    var tag = {
                        id: -1,
                        title: form.value['title'],
                        monthLimit: form.value['monthLimit'],
                        showOnDailyStats: form.value['showOnDailyStats'] || false
                    };
                    this.onPostTag(tag);
                    this.showAddForm = false;
                };
                PlanComponent = __decorate([
                    core_1.Component({
                        selector: "about",
                        templateUrl: "app/components/plan/plan.html",
                        providers: [http_service_1.HttpService]
                    }), 
                    __metadata('design:paramtypes', [http_service_1.HttpService])
                ], PlanComponent);
                return PlanComponent;
            })();
            exports_1("PlanComponent", PlanComponent);
        }
    }
});
//# sourceMappingURL=plan.component.js.map