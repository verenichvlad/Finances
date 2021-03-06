System.register(["angular2/core", "angular2/router"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent(_router) {
                    this._router = _router;
                }
                HeaderComponent.prototype.trigMenu = function (menu, menuBtn, menuIcn, brand) {
                    classie.toggle(menuBtn, 'menu-btn_toggle');
                    classie.toggle(menu, 'slideout-menu__open');
                    classie.toggle(menuIcn, 'glyphicon-menu-hamburger');
                    classie.toggle(menuIcn, 'glyphicon-remove');
                    classie.toggle(brand, 'brand_menu-opened');
                };
                HeaderComponent.prototype.navigate = function (routeName) {
                    this._router.navigate([routeName]);
                };
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: "header",
                        templateUrl: "HybridTemplates/Header"
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], HeaderComponent);
                return HeaderComponent;
            })();
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
//# sourceMappingURL=header.component.js.map