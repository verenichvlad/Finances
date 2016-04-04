import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Headers} from 'angular2/http';

@Injectable()
export class HttpService {
    
    serviceAdress: string = 'http://localhost:2528/api/';

    constructor(private _http: Http) {}

    getPosts(controllerName : string) : Observable<any> {
        return this._http.get(this.serviceAdress + controllerName)
            .map(res => res.json());
    }

    createPost(controllerName: string, post: { title: string, body: string }): Observable<any> {
        const body = JSON.stringify(post);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-urlencoded');
        return this._http.post(this.serviceAdress + controllerName, body, {
            headers: headers
        }).map(res => res.json());

    }
}