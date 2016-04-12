import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Headers} from 'angular2/http';
import {Transaction} from "../components/transactions/transaction";

@Injectable()
export class HttpService {
    
    private serviceAdress: string = 'http://localhost:2528/api/';

    constructor(private _http: Http) {}

    getPosts(controllerName : string) : Observable<any> {
        return this._http.get(this.serviceAdress + controllerName)
            .map(res => res.json());
    }

    createPost(controllerName: string, post): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.serviceAdress + controllerName,JSON.stringify(post),{headers: headers})
            .map(res => res.json());

    }

    deletePost(controllerName: string, id :number): Observable<any> {
        return this._http.delete(this.serviceAdress + controllerName + "/" + id)
            .map(res => res.json());
    }
}