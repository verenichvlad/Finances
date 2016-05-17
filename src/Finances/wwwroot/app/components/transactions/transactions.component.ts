import {Component, OnInit} from "angular2/core";
import {NgClass, NgStyle, CORE_DIRECTIVES, FORM_DIRECTIVES} from "angular2/common"
import {HttpService} from './../../services/http.service';
import {DateService} from './../../services/date.service';
import {Transaction} from "./transaction";
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from "../file-upload/ng2-file-upload";

const API_CONTROLLER_NAME = 'transactions';
const TAGS_API_CONTR_NAME = 'tags';
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
    private tags;

    private showAddForm : boolean;
    private showDropZone : boolean;
    private postSucceeded : boolean;

    constructor(private _httpServ: HttpService, private _dateServ: DateService) {
        this.vm.transactions = [];

        this.uploader.UploadCompleted.on((res) => this.onGetTransactions());
    }

    ngOnInit():any {
        this.onGetTransactions();
        this.onGetTransactionTypes();
        this.onGetTags();
    }

    onGetTags() {
        this.isLoading = true;
        this._httpServ.getPosts(TAGS_API_CONTR_NAME)
            .subscribe(responce => {
                this.tags = responce;
                this.isLoading = false;
            });
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

    onUpdateTransaction(vm : Transaction) {
        this.isLoading = true;
        this._httpServ.createPost(API_CONTROLLER_NAME + '/update', vm)
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

    isOutTrans(n : number) {
        var type = this.getTransactionTypeStr(n);
        return type.indexOf('Out') > -1;
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

    private currentPage = 1;
    private maxItemsPerPage = 10;

    getPageAmount() : number {
        var itemsAmount = this.vm.transactions.length;

        var res = itemsAmount / this.maxItemsPerPage
        if(itemsAmount % this.maxItemsPerPage > 0)
            res++;
        return res;
    }

    getPagesArray() {
        var res=[];
        var page=1;
        var pageAmount = this.getPageAmount();
        while(page <= pageAmount){
            res.push(page++);
        }
        return res;
    }

    getCurrentPageItems() {
        var startItemIndex = this.currentPage * this.maxItemsPerPage - this.maxItemsPerPage;
        var endItemIndex = startItemIndex + this.maxItemsPerPage;
        if(endItemIndex > this.vm.transactions.length)
            endItemIndex = this.vm.transactions.length;
        return this.vm.transactions.slice(startItemIndex, endItemIndex);
    }


    public query = '';
    public filteredList = [];

    filter() {
        if (this.query !== ""){
            this.filteredList = this.tags.filter(function(tag){
                return tag.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }

    select(item){
        this.query = item.title;
        this.filteredList = [];
    }

    showAddTag(transaction) {
        for(var trans of this.vm.transactions){
            if(trans.id === transaction.id) {
                trans.showAddTag = true;
            }
        }
    }

    addTagToTransaction(transaction, tag) {
        if(tag.length < 2) return;

        var tagsToAdd = this.tags.filter(function (t) {
            return t.title.toLowerCase().indexOf(tag.toLowerCase()) > -1;
        });

        var transactionToUpdate : Transaction = {
            amount: transaction.amount,
            creationDate: new Date(transaction.creationDate),
            description: transaction.description,
            tags: tagsToAdd,
            transactionType: transaction.transactionType,
            title: transaction.title,
            id: transaction.id
        };

        this.onUpdateTransaction(transactionToUpdate);
    }
}