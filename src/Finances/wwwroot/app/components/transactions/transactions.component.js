System.register(["angular2/core", "angular2/common", './../../services/http.service', './../../services/date.service', "../file-upload/ng2-file-upload"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, http_service_1, date_service_1, ng2_file_upload_1;
    var API_CONTROLLER_NAME, URL, TransactionsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_service_1_1) {
                http_service_1 = http_service_1_1;
            },
            function (date_service_1_1) {
                date_service_1 = date_service_1_1;
            },
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            }],
        execute: function() {
            API_CONTROLLER_NAME = 'transactions';
            URL = 'http://localhost:2528/api/' + API_CONTROLLER_NAME + "/upload";
            TransactionsComponent = (function () {
                function TransactionsComponent(_httpServ, _dateServ) {
                    this._httpServ = _httpServ;
                    this._dateServ = _dateServ;
                    this.vm = {};
                    this.transactionTypes = [];
                    this.isLoading = false;
                    this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
                    this.hasBaseDropZoneOver = false;
                    this.vm.transactions = [];
                    this.vm.newTransaction = {};
                }
                TransactionsComponent.prototype.ngOnInit = function () {
                    this.onGetTransactions();
                    this.onGetTransactionTypes();
                };
                TransactionsComponent.prototype.onGetTransactions = function () {
                    var _this = this;
                    this.isLoading = true;
                    this._httpServ.getPosts(API_CONTROLLER_NAME)
                        .subscribe(function (responce) {
                        _this.vm.transactions = responce;
                        _this.isLoading = false;
                        for (var _i = 0, _a = _this.vm.transactions; _i < _a.length; _i++) {
                            var transaction = _a[_i];
                            transaction.creationDate = Date.parse(transaction.creationDate);
                        }
                    });
                };
                TransactionsComponent.prototype.onGetTransactionTypes = function () {
                    var _this = this;
                    this.isLoading = true;
                    this._httpServ.getPosts(API_CONTROLLER_NAME + "/typesDictionary")
                        .subscribe(function (responce) {
                        _this.transactionTypes = responce;
                        _this.isLoading = false;
                    });
                };
                TransactionsComponent.prototype.onPostTransaction = function (vm) {
                    var _this = this;
                    this.isLoading = true;
                    this._httpServ.createPost(API_CONTROLLER_NAME, vm)
                        .subscribe(function (resp) {
                        _this.postSucceeded = resp;
                        _this.onGetTransactions();
                    });
                };
                TransactionsComponent.prototype.onRemoveTransaction = function (id) {
                    var _this = this;
                    this.isLoading = true;
                    this._httpServ.deletePost(API_CONTROLLER_NAME, id)
                        .subscribe(function (resp) {
                        _this.postSucceeded = resp;
                        _this.onGetTransactions();
                    });
                };
                TransactionsComponent.prototype.getTransactionTypeStr = function (n) {
                    for (var _i = 0, _a = this.transactionTypes; _i < _a.length; _i++) {
                        var type = _a[_i];
                        if (type.value === n) {
                            return type.name;
                        }
                    }
                    return "-";
                };
                TransactionsComponent.prototype.getDate = function () {
                    return new Date();
                };
                TransactionsComponent.prototype.onAddOk = function (title, amount, type) {
                    var transaction = {
                        id: -1,
                        title: title,
                        amount: amount,
                        description: "Ordinary transaction",
                        creationDate: new Date(),
                        transactionType: type,
                        tags: null
                    };
                    this.onPostTransaction(transaction);
                    this.showAddForm = false;
                };
                TransactionsComponent.prototype.fileOverBase = function (e) {
                    this.hasBaseDropZoneOver = e;
                };
                TransactionsComponent = __decorate([
                    core_1.Component({
                        selector: "transactions",
                        templateUrl: "app/components/transactions/transactions.html",
                        providers: [http_service_1.HttpService, date_service_1.DateService],
                        directives: [ng2_file_upload_1.FILE_UPLOAD_DIRECTIVES, common_1.NgClass, common_1.NgStyle, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES]
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