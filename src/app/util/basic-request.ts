/* 
 *  Copyright 2020-2021 404 Solutions Company
 */

import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorage } from './localStorage.service';
import { Constants } from './constants';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from './alert/alert.service';

@Injectable()
export class BasicRequest implements HttpInterceptor {
    private token: string = "";
    private deviceId: string = "";

    constructor(private router: Router, private injector: Injector, private route: ActivatedRoute) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("==============Basic Request Interceptor");
        const notificationService = this.injector.get(AlertService);
        if (localStorage.getItem(LocalStorage.TOKEN) != null) {
            this.token = localStorage.getItem(LocalStorage.TOKEN);
        }
        

        request = request.clone({
            setHeaders: {
                Authorization: this.token,
                'user-app': Constants.USERAPP,
               
            }
        });
        return next.handle(request).pipe(
            tap(event => {
                //ignore this
            }, error => {
                //for errors
                if (error.status == 440) {
                    //session timeout
                    this.router.navigateByUrl("/login");
                }
                /*if (error instanceof HttpErrorResponse) {
                    if (error.error.actionErrors != undefined) {
                        notificationService.error(error.statusText + ' - ' + error.error.actionErrors);
                    } else {
                        notificationService.error(error.statusText);
                    }
                }*/
            })
        );
    }
}