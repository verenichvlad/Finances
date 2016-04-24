import {Component} from "angular2/core";
import {ITag} from "./tag";
import {HttpService} from "../../services/http.service";

@Component({
    selector: "about",
    templateUrl: "app/components/plan/plan.html",
    providers: [HttpService]
})

export class PlanComponent {
    private tags = [];
    private showAddForm = false;
    private isLoading = false;

    constructor(private _httpServ: HttpService) {}

    onGetTags() {
        this.isLoading = true;
        this._httpServ.getPosts('tags')
            .subscribe(responce => {
                this.tags = responce;
                this.isLoading = false;
            });
    }

    onPostTag(tag : ITag) {
        this.isLoading = true;
        this._httpServ.createPost('tags', tag)
            .subscribe(resp => {
                this.onGetTags();
            });
    }

    onAddTagSubmit(form) {
        var tag : ITag = {
            id: -1,
            title: form.value['title'],
            monthLimit: form.value['monthLimit'],
            showOnDailyStats: form.value['showOnDailyStats']
        };

        this.onPostTag(tag);

        this.showAddForm = false;
    }
}