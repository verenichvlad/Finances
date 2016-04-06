import {Component} from "angular2/core";
import {HttpService} from './../../services/http.service';
import {DateService} from './../../services/date.service';


@Component({
    selector: "transactions",
    templateUrl: "app/components/transactions/transactions.html",
    providers: [HttpService, DateService]
})
export class TransactionsComponent {
    private _responce: string;
    private _apiControllerName: string = 'transactions';
    private currentDay: string = this._dateServ.getDayName(null);

    private transactions;

    private showAddForm: boolean;



    constructor(private _httpServ: HttpService, private _dateServ: DateService) {
        this.transactions = [];
        this.transactions.push({
            id: 1,
            name: "BobTrans",
            category: "MyCategory",
            amount: -20
        });

        this.transactions.push({
            id: 2,
            name: "AnotherTrans",
            category: "Personal",
            amount: -89
        });

        this.transactions.push({
            id: 3,
            name: "Third trans",
            category: "Food",
            amount: -12
        });
    }

    onRemove(id: number) {
        this.transactions = this.transactions
            .filter(function (el) {
                return el.id !== id;
            });
    }

    onAddOk(name: string, category: string, amount: number) {
        var oldId: number;

        if (this.transactions[this.transactions.length - 1])
            oldId = this.transactions[this.transactions.length - 1].id;
        else
            oldId = 0;

        this.transactions.push({
            id: oldId + 1,
            name: name,
            category: category,
            amount: amount
        });

        this.showAddForm = false;
    }


    onGetPosts() {
        this._httpServ.getPosts(this._apiControllerName)
            .subscribe(responce => this._responce = responce);
    }

    onPost(title: string, body: string) {
        this._httpServ.createPost(this._apiControllerName, { title: title, body: body })
            .subscribe(resp => this._responce = resp);
    }
}