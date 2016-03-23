import {Component, OnInit} from "angular2/core";
import {Router, RouteDefinition, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {MenuComponent} from "./components/menu.component";
import {HeaderComponent} from "./components/header.component";

import {StatusComponent} from "./components/status.component";
import {AboutComponent} from "./components/about.component";


@RouteConfig([
    {
        path: "/status",
        component: StatusComponent,
        name: "Status",
        useAsDefault: true
    },
    {
        path: "/about",
        component: AboutComponent,
        name: "About"
    }
])

@Component({
    selector: "app",
    templateUrl: "app/app.component.html",
    styleUrls: ["app/app.component.css"],
    directives: [ROUTER_DIRECTIVES, MenuComponent, HeaderComponent]
})

export class AppComponent {
    
}