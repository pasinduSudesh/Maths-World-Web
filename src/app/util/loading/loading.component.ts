import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading1',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent1 implements OnInit {
  
	public showLoading: boolean = false
	public showPercentage: boolean = false
	public showLoadingMessage: boolean = false

	public percentageValue: number = 0
	public loadingMessage: string = ''

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
		//Called after ngOnInit when the component's or directive's content has been initialized.
		//Add 'implements AfterContentInit' to the class.
		this.loadingService.showLoadingExecute().subscribe(option => this.showLoadingPanel(option))
		this.loadingService.hideLoadingExecute().subscribe(option => this.hideLoadingPanel())
		this.loadingService.changeLoadingMessageExecute().subscribe(option => this.changeMessage(option))
		this.loadingService.changeLoadingPercentageExecute().subscribe(option => this.changePercentage(option))
	}

	private showLoadingPanel(option: any) {
		if (option.showMessage) {
			this.showLoadingMessage = true
			this.loadingMessage = option.initialMessage
		} else {
			this.showLoadingMessage = false
			this.loadingMessage = ''
		}

		if (option.showPercentage) {
			this.showPercentage = true;
			this.percentageValue = option.initialPercentage
		} else {
			this.showPercentage = false;
			this.percentageValue = 0
		}

		this.showLoading = true

  }

	private hideLoadingPanel() {
		this.showLoading = false
		this.resetLoadinPanel()
	}

	private resetLoadinPanel() {
		this.showPercentage = false
		this.showLoadingMessage = false
		this.percentageValue = 0
		this.loadingMessage = ''
	}

	private changeMessage(option: any) {
		let message = option.message
		this.loadingMessage = message
	}

	private changePercentage(option: any) {
		let percentage = option.percentage
		this.percentageValue = percentage
	}

}
