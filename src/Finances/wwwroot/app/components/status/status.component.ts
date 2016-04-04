import {Component} from "angular2/core";
import {HttpService} from './../../services/http.service';
import {DateService} from './../../services/date.service';

declare var classie;

@Component({
    selector: "status",
    templateUrl: "app/components/status/status.html",
    providers: [HttpService, DateService]
})
export class StatusComponent {
    responce: string;
    apiControllerName: string = 'status';
    currentDay : string = this._dateServ.getDayName(null);

    constructor(private _httpServ: HttpService, private _dateServ : DateService) { }

    onGetPosts() {
        this._httpServ.getPosts(this.apiControllerName)
        .subscribe(responce => this.responce = responce)
    }

    onPost(title: string, body: string) {
        this._httpServ.createPost(this.apiControllerName, { title: title, body: body })
            .subscribe(resp => this.responce = resp);
    }
}