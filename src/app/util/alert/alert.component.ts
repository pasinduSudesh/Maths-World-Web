/* 
 Copyright 2020-2021 404 Solutions Company
*/

import { Component, OnInit } from '@angular/core';

import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';
@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

	public alerts: Alert[] = []

	constructor(private alertService: AlertService) { }

	ngOnInit() {
		this.alertService.getAlert().subscribe(
			(alert: Alert) => {
				if (!alert) {
					this.alerts = []
				} else {
					//add to array
					this.alerts.push(alert)
				}
			}
		)
	}

	public removeAlert(alert: Alert): void {
		this.alerts = this.alerts.filter(x => x !== alert);
	}

	public cssClass(alert: Alert): string {
		if (!alert) {
			return '';
		}

		switch (alert.type) {
			case AlertType.Success:
				return 'alert alert-success';
			case AlertType.Error:
				return 'alert alert-danger';
			case AlertType.Info:
				return 'alert alert-info';
			case AlertType.Warning:
				return 'alert alert-warning';
		}
	}
}
