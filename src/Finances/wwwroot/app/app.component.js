System.register(["angular2/core", "angular2/router", "./components/status.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, status_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (status_component_1_1) {
                status_component_1 = status_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent.prototype.ngOnInit = function () {
                    var menuEl = document.getElementById('ml-menu'), mlmenu = new MLMenu(menuEl, {
                        backCtrl: false,
                        onItemClick: closeMenu()
                    });
                    // mobile menu toggle
                    var openMenuCtrl = document.querySelector('.action--open'), closeMenuCtrl = document.querySelector('.action--close');
                    openMenuCtrl.addEventListener('click', openMenu);
                    closeMenuCtrl.addEventListener('click', closeMenu);
                    function openMenu() {
                        classie.add(menuEl, 'menu--open');
                    }
                    function closeMenu() {
                        classie.remove(menuEl, 'menu--open');
                    }
                    return null;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: "app",
                        templateUrl: "/PartialTemplates/app",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: "/status",
                            component: status_component_1.StatusComponent,
                            name: "Status",
                            useAsDefault: true
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map