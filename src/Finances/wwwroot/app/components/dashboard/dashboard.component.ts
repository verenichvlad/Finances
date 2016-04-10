import {Component} from "angular2/core";
import {HttpService} from './../../services/http.service';
import {DateService} from './../../services/date.service';


@Component({
    selector: "dashboard",
    templateUrl: "app/components/dashboard/dashboard.html",
    providers: [HttpService, DateService]
})
export class DashboardComponent {
    responce: string;
    apiControllerName: string = 'dashboard';
    
    constructor(private _httpServ: HttpService, private _dateServ : DateService) { }

    onGetPosts() {
        this._httpServ.getPosts(this.apiControllerName)
            .subscribe(responce => this.responce = responce);
    }

    onPost(title: string, body: string) {
        this._httpServ.createPost(this.apiControllerName, null)
            .subscribe(resp => this.responce = resp);
    }
}