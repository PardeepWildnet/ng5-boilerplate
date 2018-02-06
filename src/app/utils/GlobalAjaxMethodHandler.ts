// //====================== Handle Ajax Methods ================================

import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Route, Router } from '@angular/router';
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';

// import { User } from './Models/employee';

declare var jQuery: any;
declare var toastr: any;
declare var FB: any;

@Injectable()
export class GlobalAjaxMethodHandler {
    public msgs: any[] = [];

    public user_info: any;
    public user_type: any;
    public base_path: string;
    public refresh_token: string;
    public base_path_loader: string;
    public base_path_small_loader: string;
    public headers: Headers;
    public requestoptions: RequestOptions;
    public res: Response;


    public name_pattern: string;
    public email_pattern: string;
    public name_only: string;
    public password_pattern: string;
    public number_only: string;

    public loggedInObs: Rx.Subject<any> = new Rx.Subject<any>();
    public loggedInVar: boolean = false;

    constructor(public http: Http, public router: Router,private toasterService: ToasterService) {    }
        popToast(type?, title?: string, body?: string) {
        console.log(type, title, body);
        // this.toasterService.pop('success', 'Args Title', 'Args Body');
        this.toasterService.pop(type, title, body);
    }


    public getRequestOptions(url: string): RequestOptions {
        let headers;
        if (localStorage.getItem('token')) {
            let user_info = JSON.parse(localStorage.getItem('user_info'));
            headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("token",this.user_info.token);
        }
        else {
            console.log('Unautorized Request !');
        }
        let requestoptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url,
            headers: headers
        });

        return requestoptions;
    }

    public PostRequestUnautorized(url: string, data: any): any {
        // let url2 = this.customUrlParser(url);

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        });

        return this.http.request(new Request(requestoptions))
            .map((res: Response) => {
                return [{ status: res.status, json: res.json() }]
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public PostRequest(url: string, data: any, flag?: any): any {
        // let url2 = this.customUrlParser(url);

        let headers;
        headers = new Headers();
        headers.append("Content-Type", "application/json");
        // headers.append("token",this.user_info.token);

        this.requestoptions = new RequestOptions({
            method: RequestMethod.Post,
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        })

        return this.http.request(new Request(this.requestoptions))
            .map((res: Response) => {
                return [{ status: res.status, json: res }]
            })
            .catch((error: any) => {
                console.log(error.text() ? error.text() : error);
                if(error.status == 401){
                    localStorage.clear();
                    this.router.navigateByUrl('/login');
                }
                return Observable.throw(error);
            });
    }

    public GetRequest(url: string): any {
        // let url2 = this.customUrlParser(url);

        return this.http.request(new Request(this.getRequestOptions(url)))
            .map((res: Response) => {
                let jsonObj: any;
                if (res.status === 204) {
                    jsonObj = null;
                }
                else {
                    jsonObj = res.json()
                }
                return [{ status: res.status, json: jsonObj }]
            })
            .catch(error => {
                if (error.status == 0)
                    console.log('error here', error);
                return Observable.throw(error);
            });
    }

    customUrlParser(url){
        let url2: string;
        if (url.includes("?"))
            { url2 = url + '&format=json'; }
        else
            { url2 = url + '?format=json' }

        return url2;
    }

    /*Global console function for whole app*/
    console(a?, b?, c?, d?, f?, g?): void {
        console.log(a, b, c, d, g);
    }

    public logout(){
        const url = this.base_path + "admin/logout" ;
        let obj = {token:this.user_info.token};
        this.PostRequest(url,obj)
            .subscribe(res => {
                console.log(res[0].json.json());
                localStorage.clear();
                this.router.navigateByUrl('/login');
            }, 
            err => {
                console.log(err);
            })
    }
}