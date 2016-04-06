import {Component} from "angular2/core";
import {HttpService} from './../../services/http.service';


@Component({
    selector: "settings",
    templateUrl: "app/components/settings/settings.html",
    providers: [HttpService]
})
export class SettingsComponent {
    private _responce: string;
    private _apiControllerName: string = 'settings';


    constructor(private _httpServ: HttpService) { }

    onGetPosts() {
        this._httpServ.getPosts(this._apiControllerName)
            .subscribe(responce => this._responce = responce);
    }

    onPost(title: string, body: string) {
        this._httpServ.createPost(this._apiControllerName, { title: title, body: body })
            .subscribe(resp => this._responce = resp);
    }
}