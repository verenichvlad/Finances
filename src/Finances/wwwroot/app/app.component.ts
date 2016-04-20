import {Component, OnInit} from "angular2/core";
import {Router, RouteDefinition, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {HeaderComponent} from "./components/header/header.component";

import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {AboutComponent} from "./components/about/about.component";
import {PlanComponent} from "./components/plan/plan.component";


@RouteConfig([
    {
        path: "/dashboard",
        component: DashboardComponent,
        name: "Dashboard",
        useAsDefault: true
    },
    {
        path: "/transactions",
        component: TransactionsComponent,
        name: "Transactions"
    },
    {
        path: "/settings",
        component: SettingsComponent,
        name: "Settings"
    },
    {
        path: "/about",
        component: AboutComponent,
        name: "About"
    },
    {
        path: "/plan",
        component: PlanComponent,
        name: "Plan"
    }
])

@Component({
    selector: "app",
    templateUrl: "app/app.component.html",
    directives: [ROUTER_DIRECTIVES, HeaderComponent]
})

export class AppComponent {
    
}