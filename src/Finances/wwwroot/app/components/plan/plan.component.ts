import {Component, OnInit} from "angular2/core";
import {ITag} from "./tag";
import {HttpService} from "../../services/http.service";

@Component({
    selector: "about",
    templateUrl: "app/components/plan/plan.html",
    providers: [HttpService]
})

export class PlanComponent implements OnInit {
    private tags = [];
    private showAddForm = false;
    private isLoading = false;

    constructor(private _httpServ: HttpService) {}

    ngOnInit():any {
        this.onGetTags();
    }


    onGetTags() {
        this.isLoading = true;
        this._httpServ.getPosts('tags')
            .subscribe(responce => {
                if(responce)
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

    onRemoveTag(id: number) {
        this.isLoading = true;
        this._httpServ.deletePost('tags', id)
            .subscribe(resp => {
                this.onGetTags();
            });
    }

    onAddTagSubmit(form) {
        var tag : ITag = {
            id: -1,
            title: form.value['title'],
            monthLimit: form.value['monthLimit'],
            showOnDailyStats: form.value['showOnDailyStats'] || false
        };

        this.onPostTag(tag);

        this.showAddForm = false;
    }
}