/* 
 Copyright 2020-2021 404 Solutions Company
*/

import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert.model';

@Injectable({
	providedIn: 'root'
})
export class AlertService {

	private subject = new Subject<Alert>();
	private keepAfterRouteChange = false;
	private timer: any;

	constructor(private router: Router) {
		router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				if (this.keepAfterRouteChange) {
					// only keep for a single route change
					this.keepAfterRouteChange = false;
				} else {
					// clear alert messages
					this.clear();
				}
			}
		});
	}

	public getAlert(): Observable<any> {
		return this.subject.asObservable();
	}

	public success(message: string, keepAfterRouteChange = false) {
		this.alert(AlertType.Success, message, keepAfterRouteChange);
	}

	handleError(errorObj: any, keepAfterRouteChange = false) {
		if (errorObj.title == "NOTAUTHENTICATED") {
			localStorage.clear();
			this.router.navigateByUrl('/user/login');
		} else {
			this.alert(AlertType.Error, errorObj.error.code, keepAfterRouteChange);
		}
	}
	error(message: string, keepAfterRouteChange = false) {
		this.clear();
		this.alert(AlertType.Error, message, keepAfterRouteChange);
	}

	info(message: string, keepAfterRouteChange = false) {
		this.clear();
		this.alert(AlertType.Info, message, keepAfterRouteChange);
	}

	warn(message: string, keepAfterRouteChange = false) {
		this.clear()
		this.alert(AlertType.Warning, message, keepAfterRouteChange);
	}

	alert(type: AlertType, message: string, keepAfterRouteChange = false) {
		this.keepAfterRouteChange = keepAfterRouteChange;
		this.subject.next(<Alert>{ type: type, message: message });
		if (type == AlertType.Success) {
			this.timerFunc()
		}

		if (type == AlertType.Warning) {
			this.timerFunc()
		}
	}

	clear() {
		// clear alerts
		this.subject.next();
	}

	timerFunc() {
		setTimeout(() => {
			this.clear()
		}, 8000);
	}
}
