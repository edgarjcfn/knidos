var http = require('superagent');
var expect = require('expect.js');

describe('REST API server', function() {

	// This is for fast prototyping. Not good for production
	var id;

	it('creates test_item', function(done) {
		http.post('http://localhost:3000/rest/test_items/new')
			.send( {name:'Test', email:'test@hello.com'})
			.end( function(err,res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.eql(1);
				expect(res.body[0]._id.length).to.eql(24);
				id = res.body[0]._id;

				done();
			} );

	});

	it('retrieves a test_item', function(done) {
		http.get('http://localhost:3000/rest/test_items/'+id)
			.end( function(err,res) {
				expect(err).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body._id.length).to.eql(24);
				expect(res.body._id.length).to.eql(id);

				done();
			} );

	});

	it('retrieves all test_items', function(done) {
		http.get('http://localhost:3000/rest/test_items/')
			.end( function(err,res) {
				expect(err).to.eql(null);
				expect(res.body.length).to.be.above(0);
				expect(res.body.map(function (item){return item._id}))
					.to.contain(id);

				done();
			} );

	});

	it('updates a test_item', function(done){
   		http.put('http://localhost:3000/rest/test_items/'+id)
			.send({name: 'Peter', email: 'peter@yahoo.com'})
			.end(function(e, res){
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.msg).to.eql('success');

				done();
			});
  	});

  	it('checks an updated test_item', function(done){
	    http.get('http://localhost:3000/rest/test_items/'+id)
			.end(function(e, res){
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body._id.length).to.eql(24);     
				expect(res.body._id).to.eql(id);
				expect(res.body.name).to.eql('Peter');

				done();
			});
  	}); 
  
  	it('removes an test_item', function(done){
	    http.del('http://localhost:3000/rest/test_items/'+id)
			.end(function(e, res){
				expect(e).to.eql(null);
				expect(typeof res.body).to.eql('object');
				expect(res.body.msg).to.eql('success'); 

				done();
	    });
  	});
});

// From: http://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/