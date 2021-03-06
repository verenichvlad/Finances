System.register(["angular2/core", "angular2/router", "./components/header/header.component", "./components/dashboard/dashboard.component", "./components/transactions/transactions.component", "./components/settings/settings.component", "./components/about/about.component", "./components/plan/plan.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, header_component_1, dashboard_component_1, transactions_component_1, settings_component_1, about_component_1, plan_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (transactions_component_1_1) {
                transactions_component_1 = transactions_component_1_1;
            },
            function (settings_component_1_1) {
                settings_component_1 = settings_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            },
            function (plan_component_1_1) {
                plan_component_1 = plan_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    router_1.RouteConfig([
                        {
                            path: "/dashboard",
                            component: dashboard_component_1.DashboardComponent,
                            name: "Dashboard",
                            useAsDefault: true
                        },
                        {
                            path: "/transactions",
                            component: transactions_component_1.TransactionsComponent,
                            name: "Transactions"
                        },
                        {
                            path: "/settings",
                            component: settings_component_1.SettingsComponent,
                            name: "Settings"
                        },
                        {
                            path: "/about",
                            component: about_component_1.AboutComponent,
                            name: "About"
                        },
                        {
                            path: "/plan",
                            component: plan_component_1.PlanComponent,
                            name: "Plan"
                        }
                    ]),
                    core_1.Component({
                        selector: "app",
                        templateUrl: "app/app.component.html",
                        directives: [router_1.ROUTER_DIRECTIVES, header_component_1.HeaderComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map