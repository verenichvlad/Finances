import {Component} from "angular2/core";
import {HttpService} from './../../services/http.service';
import {DateService} from './../../services/date.service';
import {OnInit} from "angular2/core";
import {Transaction} from "./transaction";
import {serializeTransitionEvent} from "angular2/src/web_workers/ui/event_serializer";


@Component({
    selector: "transactions",
    templateUrl: "app/components/transactions/transactions.html",
    providers: [HttpService, DateService]
})
export class TransactionsComponent implements OnInit{
    private apiControllerName: string = 'transactions';
    private vm: any = {};
    private transactionTypes = [];
    private isLoading : boolean = true;

    private showAddForm: boolean;
    private postSucceeded : boolean;

    constructor(private _httpServ: HttpService, private _dateServ: DateService) {
        this.vm.transactions = [];
        this.vm.newTransaction = {};
    }

    ngOnInit():any {
        this.onGetTransactions();
        this.onGetTransactionTypes();
    }

    onGetTransactions() {
        this.isLoading = true;
        this._httpServ.getPosts(this.apiControllerName)
            .subscribe(responce => {
                this.vm.transactions = responce;
                this.isLoading = false;

                for(var transaction of this.vm.transactions) {
                    transaction.creationDate = Date.parse(transaction.creationDate);
                }
            });
    }

    onGetTransactionTypes() {
        this.isLoading = true;
        this._httpServ.getPosts(this.apiControllerName + "/typesDictionary")
            .subscribe(responce => {
                this.transactionTypes = responce;
                this.isLoading = false;
            });
    }


    onPostTransaction(vm: Transaction) {
        this._httpServ.createPost(this.apiControllerName, vm)
            .subscribe(resp => {
                this.postSucceeded = resp;
                this.onGetTransactions();
            });
    }

    getTransactionTypeStr(n : number) {
        for(var type of this.transactionTypes){
            if(type.value === n){
                return type.name;
            }
        }

        return "-";
    }

    getDate() {
        return new Date();
    }

    onRemoveTransaction(id: number) {
        this.vm.transactions = this.vm.transactions
            .filter(function (el) {
                return el.id !== id;
            });
    }

    onAddOk(title: string, amount: number, type: number) {
        var transaction : Transaction = {
            id: -1,
            title: title,
            amount: amount,
            description: "Ordinary transaction",
            creationDate: new Date(),
            transactionType: type,
            tags: null
        };

        this.onPostTransaction(transaction);

        this.showAddForm = false;
    }
}