import {Component} from "angular2/core";
import {HttpService} from './../../services/http.service';


@Component({
    selector: "dashboard",
    templateUrl: "app/components/dashboard/dashboard.html",
    providers: [HttpService]
})
export class DashboardComponent {
    responce: string;
    apiControllerName: string = 'dashboard';
    
    constructor(private _httpServ: HttpService) { }

    onGetPosts() {
        this._httpServ.getPosts(this.apiControllerName)
            .subscribe(responce => this.responce = responce);
    }

    onPost(title: string, body: string) {
        this._httpServ.createPost(this.apiControllerName, { title: title, body: body })
            .subscribe(resp => this.responce = resp);
    }
}