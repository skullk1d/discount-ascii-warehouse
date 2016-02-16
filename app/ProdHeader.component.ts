import {Component, Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'prodHeader',
    templateUrl: 'app/ProdHeader.html'
})
export class ProdHeader {
	selectedSort: string;

	@Output() sorted: EventEmitter<any> = new EventEmitter();

	constructor() {
		this.selectedSort = 'id'; // default
	}

	sortSelectChanged(event) {
		this.selectedSort = event.target.value;
		this.sorted.emit(this.selectedSort);
	}
}