import {Injectable} from 'angular2/core';
/*import {Http} from 'angular2/http';*/
import 'rxjs/add/operator/map';

@Injectable()
export class ASCIIService {
	constructor (/*private _http: Http*/) {}

	getProductsStream(query: string) {
		query = query || '';

		// note: angular 2 returns Observable (instead of promise)
		// newline delimited json breaks here!! cannot use angular http
		/*return this._http.get('/api/products').map(result => result.json());*/
		return oboe(`/api/products${query}`); // get promise
	}
}