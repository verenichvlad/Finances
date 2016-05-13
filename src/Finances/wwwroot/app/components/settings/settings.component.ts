import {Component, OnInit} from "angular2/core";
import {HttpService} from './../../services/http.service';
import {IUser} from "./user";


@Component({
    selector: "settings",
    templateUrl: "app/components/settings/settings.html",
    providers: [HttpService]
})
export class SettingsComponent implements OnInit {
    private user: any;
    private showUserSettings = false;
    private isLoading : boolean = false;

    constructor(private _httpServ: HttpService) { }

    ngOnInit():any {
        this.getUser();
    }


    getUser() {
        this.isLoading = true;
        this._httpServ.getPosts('settings/user')
            .subscribe(responce =>
            {
                this.user = responce
                this.isLoading = false;
            });
    }

    onPost(user : IUser) {
        this._httpServ.createPost('settings', user)
            .subscribe(resp => {});
    }
}