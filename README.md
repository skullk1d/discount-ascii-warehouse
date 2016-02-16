Discount Ascii Warehouse
====

# README #

Need to express yourself but don't have enough emoji to satisfy? Then welcome to the Discount Ascii Warehouse! This was an exam project whose only requirement was to implement the features in Angular, provided with a node server and some existing modules. As I am/was learning TypeScript and Angular 2 at the time, I decided to implement it with those. My organization and best practices may not be fantastic but I enjoyed the learning process of implementing a small "full-scale" project with Angular 2.

This project was built on top of the
[Angular 2 Quickstart boilerplate](https://angular.io/docs/ts/latest/quickstart.html).

### How do I get set up? ###

Clone this repo into your own project directory.
From there, _cd_ into your project and run:

* `npm install`
* `npm start`

This will install the core modules into the project, transpile the TypeScript files into JavaScript, generate the source maps, and then serve the app from localhost:8000. If any files change while the server is running the project will automatically recompile.

###Features###

* Display products in a grid, streamed from newline-delimited JSON
* User can sort based on 'id', 'size', or 'price'
* Products automatically load more items as you scroll down
* Idle fetching of new data
* After every 20 products an advertisement displays from [placekitten.com](http://placekitten.com).

To stream the JSON, I used [Oboe JS](http://oboejs.com/), which allowed me to use promises to handle results as they came in, detect when a request was finished, and when a request failed (to check for the end of the catalog, for example). I had attempted to use the standard Angular HTTP module but the JSON passed in by the returned Observable could not be parsed normally. However the stream created by Oboe allowed me to display results as they became available, rather than waiting to fetch a complete data set.

Products API
----

- The basic query looks like this: `/api/products`
- The response format is newline-delimited JSON.
- To get a larger results set use the `limit` parameter, eg: `/api/products?limit=100`
- To paginate results use the `skip` parameter, eg: `/api/products?limit=15&skip=30` (returns 15 results starting from the 30th).
- To sort results use the `sort` parameter, eg: `/api/products?sort=price`. Valid sort values are `price`, `size` and `id`.
