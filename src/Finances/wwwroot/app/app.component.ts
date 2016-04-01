import {Component, OnInit} from "angular2/core";
import {Router, RouteDefinition, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {HeaderComponent} from "./components/header/header.component";

import {StatusComponent} from "./components/status/status.component";
import {PlanComponent} from "./components/plan/plan.component";
import {AboutComponent} from "./components/about/about.component";


@RouteConfig([
    {
        path: "/status",
        component: StatusComponent,
        name: "Status",
        useAsDefault: true
    },
    {
        path: "/plan",
        component: PlanComponent,
        name: "Plan"
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
    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})

export class AppComponent {
    
}