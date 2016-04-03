import {Component} from "angular2/core";
import {Router} from "angular2/router";

declare var classie;

@Component({
    selector: "header",
    templateUrl: "HybridTemplates/Header"
})

export class HeaderComponent {

    constructor(private _router: Router) {}

    trigMenu(menu: any, menuBtn : any, menuIcn : any) {
        classie.toggle(menuBtn, 'menu-btn_toggle');
        classie.toggle(menu, 'slideout-menu__open');
        classie.toggle(menuIcn, 'glyphicon-menu-hamburger');
        classie.toggle(menuIcn, 'glyphicon-remove');
    }

    navigate(routeName : string) {
        this._router.navigate([routeName]);
    }
}