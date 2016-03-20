import {Component, OnInit} from "angular2/core";
import {Router, RouteDefinition, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {StatusComponent} from "./components/status.component";

declare var MLMenu: any;
declare var classie: any;
declare var dummyData: any;

@Component({
    selector: "app",
    templateUrl: "/PartialTemplates/app",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: "/status",
        component: StatusComponent,
        name: "Status",
        useAsDefault: true
    }
])

export class AppComponent implements OnInit {
    ngOnInit(): any {
        var menuEl = document.getElementById('ml-menu'),
            mlmenu = new MLMenu(menuEl, {
                backCtrl: false,
                onItemClick: closeMenu()
            });

        // mobile menu toggle
        var openMenuCtrl = document.querySelector('.action--open'),
            closeMenuCtrl = document.querySelector('.action--close');

        openMenuCtrl.addEventListener('click', openMenu);
        closeMenuCtrl.addEventListener('click', closeMenu);

        function openMenu() {
            classie.add(menuEl, 'menu--open');
        }

        function closeMenu() {
            classie.remove(menuEl, 'menu--open');
        }

        return null;
    }
}