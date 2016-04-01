import {Component} from "angular2/core"

declare var classie;

@Component({
    selector: "header",
    templateUrl: "HybridTemplates/Header"
})

export class HeaderComponent {
    trigMenu(menu : any) {
        classie.toggle(menu, 'slideout-menu__open');
        classie.toggle(document.getElementsByTagName('body')[0], 'body__menu-open');
    }
}