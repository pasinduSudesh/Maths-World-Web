/* 
 *  Copyright 2020-2021 404 Solutions Company
 */

import { Injectable, Output, EventEmitter, RendererFactory2, Renderer2, RendererStyleFlags2 } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  @Output() showLoadingPanel: EventEmitter<any> = new EventEmitter()
	@Output() hideLoadingPanel: EventEmitter<any> = new EventEmitter()
	@Output() changeMessage: EventEmitter<any> = new EventEmitter()
	@Output() changePercentage: EventEmitter<any> = new EventEmitter()

	private renderer: Renderer2;
	private importantFlag = RendererStyleFlags2.Important;

	constructor(private rendererFactory: RendererFactory2) {
		this.renderer = rendererFactory.createRenderer(null, null);
	}

	public showLoading(showMessage: boolean, showPercentage: boolean, initialMessage: string, initialPercentage: number) {
		this.showLoadingPanel.emit({
			showMessage: showMessage,
			showPercentage: showPercentage,
			initialMessage: initialMessage,
			initialPercentage: initialPercentage
		});
		//Disable scrolling
		//this.renderer.setStyle(document.body,'overflow', 'hidden', this.importantFlag);
	}

	public showLoadingExecute() {
		return this.showLoadingPanel
	}

	public hideLoading() {
		this.hideLoadingPanel.emit();
		//Enable scrolling
		//this.renderer.removeStyle(document.body, 'overflow');
	}

	public hideLoadingExecute() {
		return this.hideLoadingPanel
	}

	public changeLoadingMessage(newMessage: string) {
		this.changeMessage.emit({ message: newMessage })
	}

	public changeLoadingMessageExecute() {
		return this.changeMessage
	}

	public changeLoadingPercentage(newPercentage: number) {
		this.changePercentage.emit({ percentage: newPercentage })
	}

	public changeLoadingPercentageExecute() {
		return this.changePercentage
	}
}
