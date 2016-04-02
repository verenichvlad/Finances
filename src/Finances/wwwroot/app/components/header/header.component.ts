import {Component} from "angular2/core";
import {Router} from "angular2/router";

declare var classie;

@Component({
    selector: "header",
    templateUrl: "HybridTemplates/Header"
})

export class HeaderComponent {

    constructor(private _router: Router) {}

    trigMenu(menu : any) {
        classie.toggle(menu, 'slideout-menu__open');
        classie.toggle(document.getElementsByTagName('body')[0], 'body__menu-open');
    }

    navigate(routeName : string) {
        this._router.navigate([routeName]);
    }
}