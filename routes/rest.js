var express = require('express');
var router = express.Router();

// 
// Insert
// 
router.post('/:collectionName/new', function(req, res) {
	console.log('trying to insert into ' + req.collection);
	req.collection.insert(req.body, {}, function(err, results) {
		if (err) {
			return next(err);
		}
		res.send(results);
	});
});

// 
// Fetch all
// 
router.get('/:collectionName', function(req, res) {
	req.collection.find({}, {limit:10, sort:[['_id', -1]]}).toArray(function(err, results) {
		if (err) {
			return next(err);
		}
		res.send(results);
	});
});

//
// Fetch by id
//
router.get('/:collectionName/:id', function(req, res) {
	req.collection.findById(req.params.id, function(err, results) {
		if (err) { 
			return next(err);
		}
		res.send(results);
	});

});

//
// Update
//
router.put('/:collectionName/:id', function(req, res) {
	req.collection.updateById(req.params.id, {$set:req.body}, {safe:true, multi:false}, function(err, result) {
		if (err) {
			return next(err);
		}
		res.send((result===1)?{msg:'success'}:{msg:'error'});
	})

});

//
// Delete
//
router.delete('/:collectionName/:id', function(req, res) {
	req.collection.remove({_id:req.collection.id(req.params.id)}, function(err, result) {
		if (err) {
			return next(err);
		}
		res.send((result===1)?{msg:'success'}:{msg:'error'});
	});
});


module.exports = router;
