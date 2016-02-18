import {Component, Input, OnChanges} from 'angular2/core';
import {ASCIIService} from './asciiService.service';
import {Utils} from './utils.component';

interface IASCIIData {
	id: string;
	size: number;
	price: number;
	face: string;
	date: string;
};

@Component({
	selector: 'prodGrid',
	templateUrl: 'app/ProdGrid.html',
	providers: [ASCIIService]
})
export class ProdGrid implements OnChanges {
	asciiData: IASCIIData[];
	prodWidth: number;
	isLoading: boolean;
	currentPage: number;
	adInterval: number;
	ads: number[];
	lastAdIdx: number;
	reachedEnd: boolean;
	idleBench: number;
	idleTimeout: any;

	@Input() selectedSort: string;

	constructor(
		private _asciiService: ASCIIService
	) {
		this.prodWidth = 210;
		this.adInterval = 20;
		this.ads = [];
		this.idleBench = 5000; // 5 sec

		this.init();
	}

	init() {
		this.resetData();
		this.fetchMoreProducts();
	}

	getProducts(query) {
		var self = this;

		// subscribe to observable we get from service
		// if normal json... (receive Observable from angular http)
		/*this._asciiService.getAllProductsJSON().subscribe(
			result => this.asciiData = JSON.stringify(result), // success
			error => console.error(error), // error
			() => console.log('requested ascii data') // done (either way)
		);*/
		// if newline json... (receive promise from oboe)
		// simple fetch
		/*this._asciiService.getAllProductsJSON().done(
			result => this.asciiData = JSON.stringify(result)
		).fail(
			() => console.error('Failed to stream data')
		);*/

		// stream
		// extra careful with filter, look for all required props
		// TODO?: better to iterate over props in data interface to build filter
		this.isLoading = true;
		var stream = this._asciiService.getProductsStream(query).node(
			'{id size face price}',
			result => {
				// generate next ads (in view) just in time
				if (!((self.asciiData.length + 1) % self.adInterval)) {
					let numAds = Math.round(window.innerHeight / self.prodWidth) + 1;
					self.pushAds(numAds);
				}

				result.dateStr = Utils.getDateStr(result.date);
				self.asciiData.push(result)
			}
		).done(() => {
			self.isLoading = false;
			console.log('fetched products');
		}).fail(() => {
			self.isLoading = false;
			self.reachedEnd = true; // invalid query, no more products
			console.error('failed to fetch new products');
		});
	}

	getProductsOnPage(limit: number, skip: number) {
		//  get number (limit) of products on page (skip)
		let query: string = `?limit=${limit}&skip=${skip}&sort=${this.selectedSort}`;
		this.getProducts(query);
	}

	onScroll(event) {
		if (this.reachedEnd) {
			return;
		}

		// check if bottom of products grid is visible, load more
		// checking if we're within about one row's height away from bottom
		if (window.pageYOffset >= document.body.clientHeight - window.innerHeight - (this.prodWidth / 2)) {
			this.fetchMoreProducts();
		}
	}

	pushAds(numAds: number) {
		for (var i = 0; i < numAds; i += 1) {
			var nextAd;
			do {
				nextAd = Math.floor(Math.random() * 1000);
			} while (this.ads.indexOf(nextAd) !== -1);

			this.lastAdIdx += this.adInterval;

			this.ads.push(nextAd);
		}
	}

	fetchMoreProducts() {
		// new request came in, no longer idle, reset timeout
		clearTimeout(this.idleTimeout);
		this.idleTimeout = setTimeout(this.fetchMoreProducts.bind(this), this.idleBench);

		// per page based on offsetY of prod grid against page height
		let prodsPerPage = Math.floor(window.innerWidth / this.prodWidth) * Math.round(window.innerHeight / this.prodWidth);
		this.getProductsOnPage(prodsPerPage, this.currentPage);
		this.currentPage += 1;

		console.log('need moar!');
	}

	resetData() {
		// prepare for new set of results
		this.asciiData = [];
		this.currentPage = 0;
		this.lastAdIdx = 0;
	}

	onSorted() {
		// watch for sort to change, then request new sorted data
		this.resetData();
		this.fetchMoreProducts();
	}


	ngOnChanges(changes: { [propName: string]: SimpleChange }) {
		// angular 2 bindings changed (listener from OnChanges)
		/*console.log('changed ' + changes['selectedSort'].currentValue);*/
		this.onSorted();
	}
}