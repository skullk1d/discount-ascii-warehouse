import {Component} from 'angular2/core';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // ms

@Component({})
export class Utils {
	constructor() { };

	static getDateStr(date) {
		let now = new Date();
		let asciiDate = new Date(date);
		let timeDiff = now.getTime() - asciiDate.getTime();
		let daysAgo = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

		let dateStr = '';
		if (timeDiff >= ONE_WEEK) {
			dateStr = Utils.formatDate(date);
		} else if (!daysAgo) {
			dateStr = 'Today';
		} else {
			dateStr = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago.`;
		}

		return dateStr;
	}

	static formatDate(date) {
		let asciiDate = new Date(date);

		// outputs a date string as yyyy-MM-dd
		let day = ('0' + asciiDate.getDate()).slice(-2);
		let month = ('0' + (asciiDate.getMonth() + 1)).slice(-2);
		let year = asciiDate.getFullYear();
		let formattedDate = `${year}-${month}-${day}`;

		return formattedDate;
	}

	static getRandInt(range) {
		// from 0
		return Math.floor(Math.random() * range);
	}
}