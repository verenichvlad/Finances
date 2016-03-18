import {Component} from "angular2/core";
import {Router, RouteDefinition, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {StatusComponent} from "./components/status.component";

@Component({
    selector: "app",
    templateUrl: "/PartialTemplates/app",
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
        { path: "/status", component: StatusComponent, name: "Status", useAsDefault: true }
])

export class AppComponent {
}