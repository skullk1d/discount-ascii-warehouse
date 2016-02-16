import {Component} from 'angular2/core'
import {ProdGrid} from './ProdGrid.component'
import {ProdHeader} from './ProdHeader.component';

@Component({
    selector: 'ascii-app',
    templateUrl: 'app/app.html',
    directives: [ProdGrid, ProdHeader]
})
export class AppComponent {
	firstAd: number;
	selectedSort: string;

	constructor () {
		this.firstAd = Math.floor(Math.random() * 1000);
	}

	onSorted(selectedSort) {
		this.selectedSort = selectedSort;
	}
}