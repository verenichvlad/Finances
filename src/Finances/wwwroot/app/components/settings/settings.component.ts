import {Component} from "angular2/core";
import {HttpService} from './../../services/http.service';


@Component({
    selector: "settings",
    templateUrl: "app/components/settings/settings.html",
    providers: [HttpService]
})
export class SettingsComponent {
    private _apiControllerName: string = 'settings';
    private _resp : any;
    private user: any;


    constructor(private _httpServ: HttpService) { }


    onPost(title: string, body: string) {
        this._httpServ.createPost(this._apiControllerName, null)
            .subscribe(resp => this._resp = resp);
    }

    getUserData() {
        this._httpServ.getPosts(this._apiControllerName)
            .subscribe(responce => this.user = responce);
    }
}