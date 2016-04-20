import {Component, OnInit} from "angular2/core";
import {NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common"
import {HttpService} from './../../services/http.service';
import {DateService} from './../../services/date.service';
import {Transaction} from "./transaction";
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from "../file-upload/ng2-file-upload";

const API_CONTROLLER_NAME = 'transactions';
const URL = 'http://localhost:2528/api/' + API_CONTROLLER_NAME + "/upload";


@Component({
    selector: "transactions",
    templateUrl: "app/components/transactions/transactions.html",
    providers: [HttpService, DateService],
    directives: [FILE_UPLOAD_DIRECTIVES, NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES]
})

export class TransactionsComponent implements OnInit{
    private vm: any = {};
    private transactionTypes = [];
    private isLoading : boolean = false;

    private showAddForm: boolean;
    private showDropZone : boolean;
    private postSucceeded : boolean;

    constructor(private _httpServ: HttpService, private _dateServ: DateService) {
        this.vm.transactions = [];
        this.vm.newTransaction = {};

        this.uploader.UploadCompleted.on((res) => this.onGetTransactions());
    }

    ngOnInit():any {
        this.onGetTransactions();
        this.onGetTransactionTypes();
    }

    onGetTransactions() {
        this.isLoading = true;
        this._httpServ.getPosts(API_CONTROLLER_NAME)
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
        this._httpServ.getPosts(API_CONTROLLER_NAME + "/typesDictionary")
            .subscribe(responce => {
                this.transactionTypes = responce;
                this.isLoading = false;
            });
    }


    onPostTransaction(vm: Transaction) {
        this.isLoading = true;
        this._httpServ.createPost(API_CONTROLLER_NAME, vm)
            .subscribe(resp => {
                this.postSucceeded = resp;
                this.onGetTransactions();
            });
    }

    onRemoveTransaction(id: number) {
        this.isLoading = true;
        this._httpServ.deletePost(API_CONTROLLER_NAME, id)
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

    private uploader :FileUploader = new FileUploader({url: URL});

    private hasBaseDropZoneOver:boolean = false;

    private fileOverBase(e:any) {
        this.hasBaseDropZoneOver = e;
    }
}