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
    var TransactionsComponent;
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
            TransactionsComponent = (function () {
                function TransactionsComponent(_httpServ, _dateServ) {
                    this._httpServ = _httpServ;
                    this._dateServ = _dateServ;
                    this._apiControllerName = 'transactions';
                    this.currentDay = this._dateServ.getDayName(null);
                    this.transactions = [];
                    this.transactions.push({
                        id: 1,
                        name: "BobTrans",
                        category: "MyCategory",
                        amount: -20
                    });
                    this.transactions.push({
                        id: 2,
                        name: "AnotherTrans",
                        category: "Personal",
                        amount: -89
                    });
                    this.transactions.push({
                        id: 3,
                        name: "Third trans",
                        category: "Food",
                        amount: -12
                    });
                }
                TransactionsComponent.prototype.onRemove = function (id) {
                    this.transactions = this.transactions
                        .filter(function (el) {
                        return el.id !== id;
                    });
                };
                TransactionsComponent.prototype.onAddOk = function (name, category, amount) {
                    var oldId;
                    if (this.transactions[this.transactions.length - 1])
                        oldId = this.transactions[this.transactions.length - 1].id;
                    else
                        oldId = 0;
                    this.transactions.push({
                        id: oldId + 1,
                        name: name,
                        category: category,
                        amount: amount
                    });
                    this.showAddForm = false;
                };
                TransactionsComponent.prototype.onGetPosts = function () {
                    var _this = this;
                    this._httpServ.getPosts(this._apiControllerName)
                        .subscribe(function (responce) { return _this._responce = responce; });
                };
                TransactionsComponent.prototype.onPost = function (title, body) {
                    var _this = this;
                    this._httpServ.createPost(this._apiControllerName, { title: title, body: body })
                        .subscribe(function (resp) { return _this._responce = resp; });
                };
                TransactionsComponent = __decorate([
                    core_1.Component({
                        selector: "transactions",
                        templateUrl: "app/components/transactions/transactions.html",
                        providers: [http_service_1.HttpService, date_service_1.DateService]
                    }), 
                    __metadata('design:paramtypes', [http_service_1.HttpService, date_service_1.DateService])
                ], TransactionsComponent);
                return TransactionsComponent;
            })();
            exports_1("TransactionsComponent", TransactionsComponent);
        }
    }
});
//# sourceMappingURL=transactions.component.js.map