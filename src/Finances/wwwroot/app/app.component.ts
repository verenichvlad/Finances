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
                // breadcrumbsCtrl : true, // show breadcrumbs
                // initialBreadcrumb : 'all', // initial breadcrumb text
                backCtrl: false, // show back button
                // itemsDelayInterval : 60, // delay between each menu item sliding animation
                onItemClick: loadDummyData // callback: item that doesn´t have a submenu gets clicked - onItemClick([event], [inner HTML of the clicked item])
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

        // simulate grid content loading
        var gridWrapper = <HTMLElement> document.querySelector('.content');

        function loadDummyData(ev, itemName) {
            ev.preventDefault();

            closeMenu();
            gridWrapper.innerHTML = '';
            classie.add(gridWrapper, 'content--loading');
            setTimeout(function () {
                classie.remove(gridWrapper, 'content--loading');
                gridWrapper.innerHTML = '<ul class="products">' + dummyData[itemName] + '<ul>';
            }, 700);
        }

        return null;
    }
}